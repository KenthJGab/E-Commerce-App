import { Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function UsersWithOrders() {
  const [usersWithOrders, setUsersWithOrders] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchUsersWithOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/users-with-orders`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          const filteredUsers = data.filter((user) => user.orders.length > 0);
          setUsersWithOrders(filteredUsers.map(user => ({ ...user, visibleOrders: 1 })));
        } else {
          console.error('Received data is not an array:', data);
          setUsersWithOrders([]);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsersWithOrders();
  }, [setError]);

  const handleViewMoreOrders = (userId) => {
    setUsersWithOrders(prevUsers => {
      return prevUsers.map(user =>
        user._id === userId
          ? { ...user, visibleOrders: user.visibleOrders + 3 }
          : user
      );
    });
  };

  const handleSeeLessOrders = (userId) => {
    setUsersWithOrders(prevUsers => {
      return prevUsers.map(user =>
        user._id === userId
          ? { ...user, visibleOrders: Math.max(1, user.visibleOrders - 3) }
          : user
      );
    });
  };

  return (
    <div style={{ backgroundImage: 'url(https://i.ibb.co/ThKT97F/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <br />
        <br />
        <h2 className='text-center' style={{ marginTop: '-100px' }}>User Orders</h2>
        <br />
        <div className="d-flex flex-wrap justify-content-center">
          {usersWithOrders.map((user, index) => (
            <Card className='p-1' key={index} style={{ width: '23rem', margin: '10px' }}>
              <Card.Body>
                <Card.Title><strong>Name: {user.firstName} {user.lastName}</strong></Card.Title>
                <Card.Text>
                </Card.Text>
                <ul>
                  {user.orders.slice(0, user.visibleOrders).map((order, orderIndex) => (
                    <li key={orderIndex}>
                      <p>Product ID: {order.productId._id}</p>
                      <p>Ordered On: {new Date(order.orderedOn).toLocaleDateString() || 'N/A'}</p>
                      <p>Status: {order.status}</p>
                    </li>
                  ))}
                </ul>
                {user.orders.length > user.visibleOrders && (
                  <div>
                    <Button variant="secondary" onClick={() => handleViewMoreOrders(user._id)}>
                      View More Orders
                    </Button>
                    <br/>
                    <br/>
                    <Button
                      variant="secondary"
                      onClick={() => handleSeeLessOrders(user._id)}
                      disabled={user.visibleOrders <= 1}>
                      See Less
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
