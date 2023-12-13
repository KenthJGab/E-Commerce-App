import { Card, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function OrderHistory  ()  {
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/order-history`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setOrderHistory(data);
        } else {
          console.error('Received data is not an array:', data);
          setOrderHistory([]);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url(https://i.ibb.co/ThKT97F/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png)',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '1000px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px' }}>
        <br />
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <h2 className='text-center' style={{ fontSize: '1.5em', marginBottom: '-5px' }}>Order History</h2>
        <br />
        <br />
        <Row xs={1} md={2} lg={5} className="g-4">
          {orderHistory.map((order, index) => (
            <Col key={index}>
              <Card className='p-2' style={{ marginBottom: '10px' }}>
                <Card.Body>
                  <Card.Title><strong>Order #{order.id}</strong></Card.Title>
                  <Card.Text>
                    Ordered on: {new Date(order.orderedOn).toLocaleDateString() || 'N/A'} <br />
                    Status: {order.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
