// frontend/src/screens/CartScreen.js

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartScreen({ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart }) {
  // Tính tổng giá trị giỏ hàng
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <Alert variant="info">
          Giỏ hàng của bạn đang trống. <Link to="/">Quay lại thực đơn</Link>
        </Alert>
      ) : (
        <>
          {/* Bảng hiển thị chi tiết giỏ hàng */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tên Món Ăn</th>
                <th>Số Lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td className="d-flex align-items-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item._id)}
                      className="me-2"
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => addToCart(item)}
                      className="ms-2"
                    >
                      +
                    </Button>
                  </td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Tổng cộng và thao tác */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Tổng cộng: {totalPrice.toLocaleString()} VND</h4>
            <div>
              <Button
                variant="danger"
                className="me-3"
                onClick={clearCart}
              >
                Làm sạch giỏ hàng
              </Button>
              <Button
                variant="success"
                as={Link}
                to="/checkout"
              >
                Tiến hành đặt hàng
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

CartScreen.propTypes = {
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
  clearCart: PropTypes.func.isRequired,
};

export default CartScreen;
