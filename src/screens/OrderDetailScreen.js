import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Image, Card, Alert, Spinner, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function OrderDetailScreen({ user }) {
  const { id } = useParams(); // Lấy ID đơn hàng từ URL
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // Trạng thái lưu trữ chi tiết đơn hàng
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState(''); // Trạng thái lưu lỗi

  // Lấy URL API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user) {
        setError('Bạn cần đăng nhập để xem chi tiết đơn hàng.');
        toast.error('Bạn cần đăng nhập để xem chi tiết đơn hàng.');
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const apiUrl = `${API_URL}/orders/${id}/detail?userId=${user._id}`;
        console.log('Fetching order from URL:', apiUrl);

        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setOrder(response.data); // Lưu dữ liệu đơn hàng
        setError('');
      } catch (err) {
        console.error('Có lỗi xảy ra khi lấy đơn hàng!', err);
        if (err.response?.status === 404) {
          setError('Không tìm thấy đơn hàng.');
          toast.error('Không tìm thấy đơn hàng.');
        } else if (err.response?.status === 401) {
          setError('Bạn không có quyền truy cập vào đơn hàng này.');
          toast.error('Bạn không có quyền truy cập vào đơn hàng này.');
          navigate('/login');
        } else {
          setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
          toast.error('Không thể tải đơn hàng. Vui lòng thử lại sau.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user, navigate, API_URL]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="my-4">
        <p>Không tìm thấy đơn hàng.</p>
      </Container>
    );
  }

  return (
    <Container className="my-4 fade-in">
      <h2>Chi Tiết Đơn Hàng: {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Thông Tin Đơn Hàng</h4>
              <p>
                <strong>Ngày Đặt:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Tổng Tiền:</strong> {order.totalPrice.toLocaleString()} VND
              </p>
              <p>
                <strong>Địa Chỉ Giao Hàng:</strong> {order.address}
              </p>
              <p>
                <strong>Số Điện Thoại:</strong> {order.phone}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Sản Phẩm</h4>
              {order.items.map((item) => (
                <div key={item.foodItem} className="d-flex align-items-center mb-2">
                  <Image
                    src={item.image || 'https://via.placeholder.com/50'}
                    alt={item.name}
                    fluid
                    rounded
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                  <div className="me-auto">
                    <Link to={`/product/${item.foodItem}`}>{item.name}</Link>
                  </div>
                  <div>
                    {item.quantity} x {item.price.toLocaleString()} VND
                  </div>
                </div>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Tổng Tiền</h4>
                <p>{order.totalPrice.toLocaleString()} VND</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" as={Link} to="/orders" className="w-100">
                  Quay Lại Đơn Hàng
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

OrderDetailScreen.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderDetailScreen;
