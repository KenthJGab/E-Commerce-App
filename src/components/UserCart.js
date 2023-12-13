import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UserCart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/myCart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching cart products: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const enrichedData = await Promise.all(
            data.map(async (product) => {
              const productDetailsResponse = await fetch(`${process.env.REACT_APP_API_URL}/products/${product.productId}`);
              const productDetails = await productDetailsResponse.json();
              return { ...product, ...productDetails };
            })
          );
          setCartProducts(enrichedData);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/myCart/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const updatedResponse = await fetch(`${process.env.REACT_APP_API_URL}/cart/myCart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setCartProducts(updatedData);
          Swal.fire({
            icon: 'success',
            title: 'Product removed from cart!',
            showConfirmButton: false,
            timer: 500,
          });
        } else {
          console.error('Error fetching updated cart data:', updatedResponse.statusText);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error removing product',
          text: response.statusText,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error removing product',
        text: error.message,
      });
    }
  };

  const handleCheckout = async () => {
    try {
      Swal.fire({
        icon: 'success',
        title: 'Checkout Successful!',
        showConfirmButton: false,
        timer: 1500,
      });

      const updatedResponse = await fetch(`${process.env.REACT_APP_API_URL}/cart/myCart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setCartProducts(updatedData);
      } else {
        console.error('Error fetching updated cart data:', updatedResponse.statusText);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Checkout Failed',
        text: error.message || 'An error occurred during checkout. Please try again.',
      });
    }
  };

  return (
    <div style={{ backgroundImage: 'url(https://i.ibb.co/ThKT97F/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '1200px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
      
        <h2 className='text-center' >Cart</h2>
        <br/>
        <Row className='justify-content-center' >
          {cartProducts.map((product) => (
            <Col key={product.productId} xs={12} sm={6} lg={3}>
              <Card style={{ marginBottom: '20px', padding: '10px', marginLeft: '15px', marginRight: '15px' }}>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {product.description || 'No Description'} <br />
                    <strong>Price:</strong> {product.price || 0}
                    <br />
                    <strong>Quantity:</strong> {product.quantity || 0} <br />
                    <strong>Total Price:</strong> {product.totalPerProduct || 0} <br />
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveProduct(product.productId)}>
                    Remove
                  </Button>{'   '}
                  <Button variant="secondary" size="sm" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
