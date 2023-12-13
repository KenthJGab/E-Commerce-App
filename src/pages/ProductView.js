import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import ToCart from './ToCart';

export default function ProductView() {
  const { user } = useContext(UserContext);
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState('');
  const [quantity] = useState(1);

  const isAdmin = user.isAdmin; 

  const addToCart = (productId, quantity) => {
    if (quantity <= 0) {
      Swal.fire({
        title: 'Invalid Quantity',
        icon: 'error',
        text: 'Please enter a valid quantity greater than 0.',
      });
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === 'Thank You for Purchasing.') {
          Swal.fire({
            title: 'Order Created',
            icon: 'success',
            text: 'Product has been added to your orders and is pending.',
          });
        } else {
          Swal.fire({
            title: 'Creating Order Failed',
            text: 'Create an Account First or Login.',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred while creating order. Please try again.',
        });
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImageLink(data.imageLink);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center justify-content-center">
        <Col lg={6} className="mb-3 mb-lg-0">
          <Card className="text-center" style={{ border: '1px solid white' }}>
            <Card.Img
              variant="top"
              src={imageLink}
              alt={name}
              style={{ width: '70%', maxHeight: '600px', objectFit: 'cover' }}
              className="mx-auto"
            />
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="text-center" style={{ border: '1px solid white' }}>
            <Card.Body>
              <Card.Title>
                <h1>{name}</h1>
              </Card.Title>
              <Card.Text>
                <h4>{description}</h4>
              </Card.Text>
              <Card.Text>
                <h4 style={{ color: 'red' }}> ₱ {price}</h4>
              </Card.Text>

              <Form.Group controlId="quantity">
                {/* ... (unchanged) */}
              </Form.Group>

              {isAdmin ? (
                <Link className="btn btn-secondary btn-block" to={`/products`}>
                  Details
                </Link>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    block
                    onClick={() => addToCart(productId, quantity)}
                  >
                    Checkout
                  </Button>
                  <br />
                  <br />
                  {user.id !== null ? (
                    <ToCart
                      productId={productId}
                      isLoggedIn={user.id !== null}
                      productName={name}
                      productDescription={description}
                      productPrice={price}
                    />
                  ) : (
                    <Link className="btn btn-danger btn-block" to="/login">
                      Login
                    </Link>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}