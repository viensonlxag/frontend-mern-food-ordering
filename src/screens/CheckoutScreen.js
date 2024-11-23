// frontend/src/screens/CheckoutScreen.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

function CheckoutScreen({ cartItems, clearCart }) {
  const [user, setUser] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize toast notifications (Không cần toast.configure())
  useEffect(() => {
    // Không cần gọi toast.configure() ở đây
    // toast.configure(); // Loại bỏ dòng này
  }, []);

  // Lấy thông tin người dùng và tính tổng giá trị giỏ hàng
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Stored User:', storedUser);
    if (!storedUser) {
      setError('Vui lòng đăng nhập trước khi thanh toán.');
      toast.error('Vui lòng đăng nhập trước khi thanh toán.');
      navigate('/login');
      return;
    }
    setUser(storedUser);
    setCustomerName(storedUser.name || '');

    // Sử dụng cartItems prop trực tiếp
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    console.log('Cart Items:', updatedCartItems); // Log cart items
    const calculatedTotal = updatedCartItems.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );

    console.log('Total Amount:', calculatedTotal); // Log totalAmount

    setTotalAmount(calculatedTotal);
  }, [cartItems, navigate]);

  // Xử lý thanh toán
  const handleCheckout = async () => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để thực hiện thanh toán.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống.');
      return;
    }

    const orderData = {
      userId: user._id, // Sử dụng _id
      items: cartItems.map((item) => ({
        foodItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: totalAmount,
      customerName,
      address,
      phone,
    };

    console.log('Prepared Order Data:', orderData);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/orders/create`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${user.token}` // Nếu backend yêu cầu token xác thực
        },
      });
      console.log('Order Created:', response.data);
      toast.success('Thanh toán thành công! Đơn hàng của bạn đã được lưu.');
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error('Lỗi khi thanh toán:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi thực hiện thanh toán.');
      toast.error(err.response?.data?.message || 'Đã xảy ra lỗi khi thực hiện thanh toán.');
    }
  };

  return (
    <Container className="my-4 fade-in">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="checkout-card p-4 shadow-sm">
            <h2 className="mb-4 text-center">Thông Tin Thanh Toán</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
            >
              <Form.Group controlId="customerName" className="mb-3">
                <Form.Label>Tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="address" className="mb-3">
                <Form.Label>Địa chỉ giao hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ của bạn"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Nhập số điện thoại của bạn"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>

              <h5 className="mt-4">Tổng giá: {totalAmount.toLocaleString()} VND</h5>

              <Button type="submit" variant="success" className="w-100 mt-3">
                Thanh Toán
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
}

CheckoutScreen.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default CheckoutScreen;
