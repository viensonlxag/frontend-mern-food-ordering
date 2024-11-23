import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import aboutImage from '../assets/images/about.jpg'; // Đảm bảo đường dẫn đúng

const AboutScreen = () => {
  return (
    <Container className="my-5 fade-in">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="about-heading">Chào mừng đến với Sơn Restaurant!</h1>
          <p className="about-paragraph">Đặt món ăn trực tuyến nhanh chóng và tiện lợi!</p>
        </Col>
      </Row>
      <Row className="align-items-center mb-5">
        <Col md={6} className="text-md-start text-center">
          <h3 className="about-heading">Sứ mệnh của chúng tôi</h3>
          <p className="about-paragraph">
            Mang đến cho bạn trải nghiệm ẩm thực trọn vẹn nhất, từ những món ăn chất lượng đến dịch vụ giao hàng nhanh chóng.
          </p>
          <ul className="about-paragraph">
            <li>Ẩm thực đến gần hơn với mọi nhà.</li>
            <li>Tiết kiệm thời gian và công sức.</li>
            <li>Đảm bảo chất lượng món ăn và dịch vụ.</li>
          </ul>
        </Col>
        <Col md={6} className="text-center">
          <img
            src={aboutImage} // Đảm bảo ảnh đã import
            alt="Sơn Restaurant"
            className="img-fluid rounded about-image"
          />
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <h3 className="about-heading">Thông tin liên hệ</h3>
          <p className="about-paragraph">
            <strong>Địa chỉ:</strong> 123 Đường Thành Công, Quận 1, TP. Hồ Chí Minh <br />
            <strong>Số điện thoại:</strong> 0123-456-789 <br />
            <strong>Giờ hoạt động:</strong> 10:00 - 22:00 hàng ngày
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
