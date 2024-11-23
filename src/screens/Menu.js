// frontend/src/screens/Menu.js

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

  useEffect(() => {
    // Gọi API lấy danh sách món ăn
    const fetchFoodItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/fooditems?search=${searchTerm}`);
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
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Kích hoạt tìm kiếm với từ khóa mới
    setSearchTerm(e.target.elements.search.value);
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
      <Row>
        {foodItems.length === 0 && !loading && !error ? (
          <p>Không tìm thấy món ăn nào.</p>
        ) : (
          foodItems.map((item) => (
            <Col key={item._id} sm={12} md={6} lg={4} className="mb-4">
              <FoodItem item={item} addToCart={addToCart} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

Menu.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Menu;
