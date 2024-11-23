// frontend/src/components/Navbar.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container, NavDropdown, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { toast } from 'react-toastify';

function NavigationBar({ cartItems = [], user, setUser }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false); // Chế độ sáng/tối

  const logoutHandler = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode); // Thêm/lớp class dark-mode vào body
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="light" expand="lg" className={`custom-navbar ${darkMode ? 'navbar-dark bg-dark' : ''}`}>
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="custom-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang Chủ</Nav.Link>
            <Nav.Link onClick={() => navigate('/menu')} className="nav-special-link">Thực Đơn</Nav.Link>
            <Nav.Link as={Link} to="/about">Giới Thiệu</Nav.Link>
            <Nav.Link as={Link} to="/contact">Liên Hệ</Nav.Link>
          </Nav>

          {/* User Actions */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">
              Giỏ Hàng <span className="badge bg-secondary">{totalItems}</span>
            </Nav.Link>
            {user ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Thông Tin Cá Nhân</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">Đơn Hàng</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Đăng Xuất</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Đăng Nhập</Nav.Link>
                <Nav.Link as={Link} to="/register">Đăng Ký</Nav.Link>
              </>
            )}
          </Nav>

          {/* Toggle Dark Mode */}
          <Form className="ms-3">
            <Button
              className="toggle-dark-mode-btn"
              variant={darkMode ? 'light' : 'dark'}
              onClick={toggleDarkMode}
            >
              {darkMode ? 'Chế Độ Sáng' : 'Chế Độ Tối'}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavigationBar.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func.isRequired,
};

export default NavigationBar;
