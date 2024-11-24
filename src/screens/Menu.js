import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert, Form, Button } from 'react-bootstrap';
import FoodItem from '../components/FoodItem';

function Menu({ addToCart }) {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState(''); // Lưu từ khóa thực tế dùng để gọi API

  // Lấy URL API từ biến môi trường
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';

  useEffect(() => {
    // Gọi API lấy danh sách món ăn
    const fetchFoodItems = async () => {
      if (query === '') return; // Không gọi API nếu query rỗng
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
    const newSearchTerm = e.target.elements.search.value.trim();
    if (newSearchTerm !== searchTerm) {
      setSearchTerm(newSearchTerm); // Cập nhật từ khóa
      setQuery(newSearchTerm); // Gửi request với từ khóa mới
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Thực Đơn</h2>

      {/* Thanh tìm kiếm */}
      <Form onSubmit={handleSearch} className="d-flex mb-4">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm món ăn..."
          name="search"
          className="me-2"
          defaultValue={searchTerm} // Hiển thị từ khóa hiện tại
        />
        <Button type="submit" variant="primary">Tìm</Button>
      </Form>

      {/* Hiển thị Spinner khi đang tải */}
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      )}

      {/* Hiển thị thông báo lỗi */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Hiển thị danh sách món ăn */}
      {!loading && !error && foodItems.length === 0 && (
        <p className="text-center">Không tìm thấy món ăn nào phù hợp.</p>
      )}
      <Row>
        {foodItems.map((item) => (
          <Col key={item._id} sm={12} md={6} lg={4} className="mb-4">
            <FoodItem item={item} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

Menu.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Menu;
