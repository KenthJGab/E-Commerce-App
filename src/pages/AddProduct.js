import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Card } from 'react-bootstrap';

export default function AddProduct() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Input states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(name !== '' && description !== '' && price !== '' && imageLink !== ''); // Include imageLink in the check
  }, [name, description, price, imageLink]);

  function createProduct(e) {
    e.preventDefault();

    if (!isActive) {
      return;
    }

    let token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        imageLink: imageLink,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Product Added',
          });

          navigate('/products/');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful Product Creation',
            text: data.message || 'An error occurred while creating the product.',
          });
        }
      })
      //
      .catch((error) => {
        console.error('Error creating product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the product.',
        });
      })
      .finally(() => {
        setName('');
        setDescription('');
        setPrice('');
        setImageLink('');
      });
  }

  return user.isAdmin === true ? (
    <div style={{ backgroundImage: 'url(https://i.ibb.co/ThKT97F/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card className="my-5 mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h1 className="text-center mb-4">Add Product</h1>
          <Form onSubmit={(e) => createProduct(e)}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image Link:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Link"
                required
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </Form.Group>
            <br />
            <div className="d-flex justify-content-center">
              {isActive ? (
                <Button variant="primary" type="submit">
                  Add Product
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  Add Product
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  ) : null;
}
