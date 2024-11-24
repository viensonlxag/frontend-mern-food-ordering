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

  // API Base URL
  const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-food-ordering.onrender.com/api';

  useEffect(() => {
    // Fetch food items based on the search term
    const fetchFoodItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/fooditems?search=${searchTerm}`);
        setFoodItems(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching food items:', error);
        setError('Unable to load food items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [searchTerm, API_URL]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.elements.search.value.trim();
    setSearchTerm(newSearchTerm); // Update search term and trigger API call
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Thực Đơn</h2>

      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="d-flex mb-4">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm món ăn..."
          name="search"
          className="me-2"
          defaultValue={searchTerm} // Show the current search term
        />
        <Button type="submit" variant="primary">Tìm</Button>
      </Form>

      {/* Loading Indicator */}
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      )}

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* No Items Found */}
      {!loading && !error && foodItems.length === 0 && (
        <p className="text-center">Không tìm thấy món ăn nào phù hợp.</p>
      )}

      {/* Display Food Items */}
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
