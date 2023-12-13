import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function UserLists() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/allUsers`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdminActionClick = async (userId, isAdmin) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const method = isAdmin ? 'DELETE' : 'PUT';
      const actionText = isAdmin ? 'Remove Admin' : 'Make Admin';

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/updateAdmin`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${actionText.toLowerCase()}`);
      }

      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ backgroundImage: 'url(https://i.ibb.co/ThKT97F/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginTop: '-200px' }}>
        <h2 className='text-center'>User Lists</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <div className="d-flex flex-wrap justify-content-center">
          {users.map((user) => (
            <Card key={user._id} style={{ width: '18rem', margin: '10px' }}>
              <Card.Body>
                <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                <Card.Text>{`Email: ${user.email}`}</Card.Text>
                <Button variant='secondary' onClick={() => handleAdminActionClick(user._id, user.isAdmin)}>
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
