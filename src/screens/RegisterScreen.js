import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Lấy URL API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Xóa lỗi trước đó

    try {
      const response = await axios.post(`${API_URL}/users/register`, { name, email, password });
      console.log('Register Response:', response.data);

      // Hiển thị thông báo thành công
      toast.success('Đăng ký thành công! Hãy đăng nhập để tiếp tục.', {
        position: 'top-right',
        autoClose: 2000,
      });

      // Chuyển hướng tới trang đăng nhập
      navigate('/login');
    } catch (err) {
      console.error('Register Error:', err.response || err.message);
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký.');
    }
  };

  return (
    <Container className="my-4">
      <h2>Đăng Ký</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Tên:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

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

        <Button variant="primary" type="submit" className="mt-3 w-100">
          Đăng Ký
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterScreen;
