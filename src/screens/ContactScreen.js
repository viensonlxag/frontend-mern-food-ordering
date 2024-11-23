// src/screens/ContactScreen.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // Import Axios

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu liên hệ đến backend
      await axios.post('http://localhost:5000/api/contact', { name, email, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setError(null); // Xóa lỗi nếu có
    } catch (err) {
      console.error('Lỗi khi gửi liên hệ:', err);
      setError('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!');
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
        <Button variant="primary" type="submit" className="w-100">
          Gửi
        </Button>
      </Form>
    </Container>
  );
};

export default ContactScreen;
