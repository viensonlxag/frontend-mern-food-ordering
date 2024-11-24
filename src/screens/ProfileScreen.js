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

  // Lấy URL API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';

  useEffect(() => {
    if (!user || !user._id) {
      setError('Người dùng chưa đăng nhập.');
      toast.error('Người dùng chưa đăng nhập.');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for user ID:', user._id);
        const response = await axios.get(`${API_URL}/users/profile/${user._id}`);
        console.log('Profile data:', response.data);
        setProfile(response.data);
      } catch (err) {
        console.error('Profile Error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Đã xảy ra lỗi khi tải thông tin cá nhân.');
        toast.error(err.response?.data?.message || 'Đã xảy ra lỗi khi tải thông tin cá nhân.');
      }
    };

    fetchProfile();
  }, [user, navigate, API_URL]);

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
      <p>
        <strong>Tên:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      {/* Thêm các thông tin khác nếu cần */}
    </Container>
  );
}

ProfileScreen.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default ProfileScreen;
