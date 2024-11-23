// frontend/src/components/Cart.js

import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

function Cart({ cartItems, addToCart, decreaseQuantity, removeFromCart }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Tên Món Ăn</th>
                <th>Số Lượng</th>
                <th>Giá</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  addToCart={addToCart} 
                  decreaseQuantity={decreaseQuantity} 
                  removeFromCart={removeFromCart} 
                />
              ))}
            </tbody>
          </table>
          <h3>Tổng cộng: {totalPrice.toLocaleString()} VND</h3>
          <button onClick={() => window.location.href='/checkout'}>Tiến hành đặt hàng</button>
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
