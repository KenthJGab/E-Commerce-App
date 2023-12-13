import React from 'react';
import { Row, Col } from 'react-bootstrap';


export default function Banner({ data }) {
  const { image, title, content } = data;

  return (
    <Row>
      <Col className="banner-container p-5 text-center">
        {image && <img src={image} alt="Banner" className="banner-img" />}
        <h1 className="banner-title">{title}</h1>
        <br/>
        <br/>
        <p className="banner-content">{content}</p>

      </Col>
    </Row>
  );
}