import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { breakPoint, data } = props;

  const { _id, name, description, price, imageLink } = data;

  return (
    <Col xs={4} md={breakPoint}>
      <Card className="cardHighlight mx-2" style={{ border: '1px solid white' }}>
        {imageLink && (
          <Card.Img
            variant="top"
            src={imageLink}
            alt={name}
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover', margin: 'auto' }}
          />
        )}
        <Card.Body>
          <Card.Title className="text-center" style={{ fontSize: '0.9rem' }}>
            {name}
          </Card.Title>
          <Card.Text className="text-center" style={{ fontSize: '0.7rem' }}>{description}</Card.Text>
        </Card.Body>
        <Card.Footer  style={{ backgroundColor: '#FFFFFF'}} >
          <h6 className="text-center" style={{ fontSize: '0.9rem' }}>₱{price}</h6>
          <Link
            className="btn d-block"
            to={`/products/${_id}`}
            style={{ backgroundColor: '#B5B5B5', color: 'black' }}
          >
            Buy
          </Link>
          <br/>
        </Card.Footer>
      </Card>
    </Col>
  );
}
