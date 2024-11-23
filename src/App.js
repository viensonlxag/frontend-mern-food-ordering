// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import Menu from './screens/Menu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Tải cartItems và user từ localStorage khi component được mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart) {
      setCartItems(storedCart);
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Cập nhật localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cập nhật localStorage mỗi khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Hàm thêm món ăn vào giỏ hàng
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Hàm giảm số lượng món ăn trong giỏ hàng
  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item._id === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // Nếu quantity = 1, xóa món ăn khỏi giỏ hàng
          return prevItems.filter((item) => item._id !== itemId);
        }
      }
      return prevItems;
    });
  };

  // Hàm xóa hoàn toàn món ăn khỏi giỏ hàng
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  // Hàm làm sạch giỏ hàng sau khi thanh toán thành công
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      {/* Navigation Bar */}
      <NavigationBar cartItems={cartItems} user={user} setUser={setUser} />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<MenuScreen addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartScreen
              cartItems={cartItems}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/checkout" element={<CheckoutScreen cartItems={cartItems} clearCart={clearCart} />} />
        <Route path="/login" element={<LoginScreen setUser={setUser} />} />
        <Route path="/register" element={<RegisterScreen setUser={setUser} />} />
        <Route path="/profile" element={<ProfileScreen user={user} />} />
        <Route path="/orders" element={<OrdersScreen user={user} />} />
        <Route path="/order/:id" element={<OrderDetailScreen user={user} />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
