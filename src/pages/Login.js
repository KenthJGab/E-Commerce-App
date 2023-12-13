import { Form, Button, Card } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  

  function authenticate(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.access !== 'undefined') {
          localStorage.setItem('token', data.access);
          retrieveUserDetails(data.access);

          setUser({
            access: localStorage.getItem('token'),
          });

          Swal.fire({
            imageUrl: 'https://i.ibb.co/hg9Q3F1/Untitled-design-1.png',
            title: 'Login Succesful',
            text: 'Welcome to SHopSHeeSH!',
            showConfirmButton: false,
            imageWidth: 200,
            imageHeight: 200,
            timer: 1000,
          });
        } else {
          Swal.fire({
            title: 'Authentication failed',
            icon: 'error',
            text: 'Check your login details and try again.',
          });
        }
      });

    setEmail('');
    setPassword('');
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    user.id !== null ? (
      <Navigate to="/" />
    ) : (
      <div style={{ backgroundImage: 'url(https://i.ibb.co/ThKT97F/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card className="login-card mx-auto p-4" style={{ maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <h1 className="login-title mb-4 text-center bg">
            Login
          </h1>
          <Form className="login-form" onSubmit={(e) => authenticate(e)}>
            <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <br/>
            {isActive ? (
              <Button className="login-submit-btn" variant="dark" type="submit" id="submitBtn">
                Login
              </Button>
            ) : (
              <Button className="login-submit-btn" variant="dark" type="submit" id="submitBtn" disabled>
                Login
              </Button>
            )}
          </Form>
          <br/>
          <div className="register-link mt-2 text-center">
            No Account? <Link to="/register">Click here to register</Link>
          </div>
        </Card>
      </div>
    )
  );
}
