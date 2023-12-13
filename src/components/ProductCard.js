import { Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
  const { _id, name, description, price, imageLink } = productProp;

  return (
    <Col xs={6} md={4} lg={3}>
      <Card style={{ border: '1px solid white' }} className="text-center">
        {imageLink && (
          <Card.Img
            variant="top"
            src={imageLink}
            alt={name}
            style={{ maxWidth: '70%', height: 'auto', objectFit: 'cover', margin: 'auto' }}
          />
        )}

        <Card.Body style={{ marginTop: '10px' }}>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>₱ {price}</Card.Text>
          <Link
            className="btn"
            to={`/products/${_id}`}
            style={{ backgroundColor: '#B5B5B5', color: 'black' }}
          >
            Add to Cart
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageLink: PropTypes.string, // Add imageLink to propTypes
  }),
};
