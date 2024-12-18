import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Alert, Carousel, Spinner, Form, Button } from 'react-bootstrap';
import FoodItem from '../components/FoodItem';
import PropTypes from 'prop-types';
import bannerImage1 from '../assets/images/banner.jpg';
import bannerImage2 from '../assets/images/banner2.jpg';
import bannerImage3 from '../assets/images/banner3.jpg';

function MenuScreen({ addToCart }) {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('search') || '';
  const [searchTerm, setSearchTerm] = useState(query); // Đồng bộ từ khóa tìm kiếm với URL

  // Lấy URL API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';

  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/fooditems?search=${query}`);
        setFoodItems(response.data);
        setError('');
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách món ăn!', error);
        setError('Không thể tải danh sách món ăn. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [query, API_URL]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm.trim()}`); // Cập nhật URL với từ khóa tìm kiếm mới
  };

  // Dữ liệu mẫu cho Carousel
  const carouselItems = [
    {
      src: bannerImage1,
      alt: 'Banner 1',
      caption: 'Chào mừng đến với Nhà Hàng của Chúng Tôi!',
    },
    {
      src: bannerImage2,
      alt: 'Banner 2',
      caption: 'Thực Đơn Đặc Sản Mới!',
    },
    {
      src: bannerImage3,
      alt: 'Banner 3',
      caption: 'Ưu Đãi Đặc Biệt Trong Tháng!',
    },
  ];

  return (
    <Container className="my-4">
      {/* Carousel Banner */}
      <Carousel>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index} interval={3000}>
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>{item.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Thanh tìm kiếm */}
      <Form onSubmit={handleSearch} className="my-4">
        <Row className="align-items-center">
          <Col md={10} className="p-0">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </Col>
          <Col md={2} className="p-0">
            <Button variant="primary" type="submit" className="w-100 search-button">
              Tìm
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Thực Đơn */}
      <h2 className="mt-5">Thực Đơn</h2>

      {/* Hiển thị Spinner khi đang tải dữ liệu */}
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      )}

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Hiển thị danh sách món ăn */}
      <Row>
        {foodItems.length === 0 && !loading && !error ? (
          <Col>
            <p>Không tìm thấy món ăn nào phù hợp với tìm kiếm của bạn.</p>
          </Col>
        ) : (
          foodItems.map((item, index) => (
            <Col key={`${item._id}-${index}`} sm={12} md={6} lg={4} className="mb-4">
              <FoodItem item={item} addToCart={addToCart} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

MenuScreen.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default MenuScreen;
