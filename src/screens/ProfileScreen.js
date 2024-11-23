// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Container, Spinner, Alert } from 'react-bootstrap';

function ProfileScreen({ user }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu user chưa đăng nhập
    if (!user || !user._id) { // Sử dụng _id thay vì id
      setError('Người dùng chưa đăng nhập.');
      toast.error('Người dùng chưa đăng nhập.');
      navigate('/login'); // Chuyển hướng đến trang đăng nhập nếu không có user
      return;
    }

    // Lấy thông tin cá nhân
    console.log('Fetching profile for user ID:', user._id); // Sử dụng _id
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    axios
      .get(`${API_URL}/users/profile/${user._id}`) // Sử dụng _id và biến môi trường
      .then(({ data }) => {
        console.log('Profile data:', data); // Log dữ liệu nhận được
        setProfile(data);
      })
      .catch((err) => {
        console.error('Profile Error:', err.response?.data || err.message); // Log lỗi
        setError(err.response?.data?.message || 'Đã xảy ra lỗi.');
        toast.error(err.response?.data?.message || 'Đã xảy ra lỗi.');
      });
  }, [user, navigate]);

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p>Đang tải...</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2>Thông Tin Cá Nhân</h2>
      <p><strong>Tên:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      {/* Thêm các thông tin khác nếu cần */}
    </Container>
  );
}

ProfileScreen.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Sử dụng _id thay vì id
    name: PropTypes.string,
    email: PropTypes.string,
    // Thêm các trường khác nếu cần
  }).isRequired,
};

export default ProfileScreen;
