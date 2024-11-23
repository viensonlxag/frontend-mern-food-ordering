// src/components/CartItem.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CartItem({ item, addToCart, decreaseQuantity, removeFromCart }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <Button variant="secondary" onClick={() => addToCart(item)}>
          +
        </Button>
        <span style={{ margin: '0 10px' }}>{item.quantity}</span>
        <Button variant="secondary" onClick={() => decreaseQuantity(item._id)}>
          -
        </Button>
      </td>
      <td>{(item.price * item.quantity).toLocaleString()} VND</td>
      <td>
        <Button variant="danger" onClick={() => removeFromCart(item._id)}>
          Xóa
        </Button>
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItem;
