import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios'; // Import Axios

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Trạng thái đang gửi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu trạng thái gửi
    setError(null);
    setSuccess(false);

    try {
      // Gửi dữ liệu liên hệ đến backend
      const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';
      await axios.post(`${API_URL}/contact`, { name, email, message });

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Lỗi khi gửi liên hệ:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!');
    } finally {
      setLoading(false); // Kết thúc trạng thái gửi
    }
  };

  return (
    <Container className="my-5 fade-in">
      <h1 className="text-center">Liên Hệ</h1>
      <p className="text-center">Chúng tôi luôn sẵn sàng lắng nghe bạn!</p>
      {success && <Alert variant="success">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="contact-form">
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Tên của bạn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="message" className="mb-3">
          <Form.Label>Tin nhắn</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Nhập tin nhắn"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Đang gửi...
            </>
          ) : (
            'Gửi'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ContactScreen;
