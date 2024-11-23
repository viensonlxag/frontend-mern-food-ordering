// frontend/src/screens/LoginScreen.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify'; // Import toast từ react-toastify

function LoginScreen({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy URL API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu trạng thái tải
    setError(''); // Xóa lỗi trước đó

    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      console.log('Login Response:', response.data); // Kiểm tra cấu trúc của response.data.user

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Cập nhật trạng thái người dùng trong ứng dụng
      setUser(response.data.user);

      // Hiển thị thông báo thành công và chuyển hướng khi toast đóng
      toast.success('Đăng nhập thành công!', { // Hiển thị toast thành công
        position: "top-right",
        autoClose: 1000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          console.log('Toast đã đóng, chuyển hướng...');
          navigate('/'); // Chuyển hướng khi toast đóng
        }, 
      });

      // Không cần setTimeout nữa
    } catch (error) {
      console.error('Login Error:', error.response || error.message);
      // Hiển thị thông báo lỗi
      toast.error(error.response?.data?.message || 'Đã xảy ra lỗi');

      // Cập nhật trạng thái lỗi để hiển thị Alert (nếu cần)
      setError(error.response?.data?.message || 'Đã xảy ra lỗi');

      // Làm sạch trường mật khẩu để bảo mật
      setPassword('');
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Đăng Nhập</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Sử dụng Alert từ Bootstrap */}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Mật khẩu:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading} className="w-100">
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Đang xử lý...
            </>
          ) : (
            'Đăng Nhập'
          )}
        </Button>
      </Form>
      {/* Không cần ToastContainer ở đây */}
    </Container>
  );
}

LoginScreen.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginScreen;
