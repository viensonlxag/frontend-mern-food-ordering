// src/components/FoodItem.js

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

function FoodItem({ item, addToCart }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={item.imageUrl || 'https://via.placeholder.com/300x200'}
        alt={item.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Text>Giá: {item.price.toLocaleString()} VND</Card.Text>
        <Button variant="primary" onClick={() => addToCart(item)}>
          Thêm vào giỏ hàng
        </Button>
      </Card.Body>
    </Card>
  );
}

FoodItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default FoodItem;
