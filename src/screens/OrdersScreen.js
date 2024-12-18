import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

function OrdersScreen({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Lấy URL API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError('Bạn cần đăng nhập để xem danh sách đơn hàng.');
        toast.error('Bạn cần đăng nhập để xem danh sách đơn hàng.');
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const apiUrl = `${API_URL}/orders/${user._id}`;
        console.log('Fetching orders from URL:', apiUrl);
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setOrders(response.data);
        setError('');
      } catch (err) {
        console.error('Có lỗi xảy ra khi lấy danh sách đơn hàng!', err);
        if (err.response?.status === 404) {
          setError('Không tìm thấy đơn hàng nào.');
          toast.info('Không tìm thấy đơn hàng nào.');
        } else {
          setError('Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.');
          toast.error('Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate, API_URL]);

  return (
    <Container className="my-4 fade-in">
      <h2 className="mb-4">Đơn Hàng Của Tôi</h2>
      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">Bạn chưa có đơn hàng nào.</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày Đặt</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.totalPrice.toLocaleString()} VND</td>
                <td>{order.status || 'Chưa xử lý'}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    as={Link}
                    to={`/order/${order._id}`}
                  >
                    Xem Chi Tiết
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

OrdersScreen.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default OrdersScreen;
