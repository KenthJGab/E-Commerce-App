import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          // It is to clear input fields
          setFirstName('');
          setLastName('');
          setEmail('');
          setMobileNo('');
          setPassword('');
          setConfirmPassword('');

          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Thank you for registering!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed!',
            text: 'Email already registered.',
          });
        }
      });
  }

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      mobileNo !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  return (
    <div style={{ backgroundImage: 'url(https://i.ibb.co/ThKT97F/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card className="mx-auto mt-5 p-4" style={{ maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        {user.id !== null ? (
          <Navigate to="/products" />
        ) : (
          <Form onSubmit={(e) => registerUser(e)}>
            <Card.Body>
              <h1 className="registerStyle my-5 mt-0 text-center">Register</h1>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <br/>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <br/>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <br/>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Enter 11 Digit No."
                  required
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </Form.Group>
              <br/>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <br/>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
            <br/>
            <Card.Footer className="text-center">
              {isActive ? (
                <Button variant="dark" type="submit">
                  Register
                </Button>
              ) : (
                <Button variant="dark" disabled>
                  Register
                </Button>
                
              )}
              <br/>
              <br/>
              <div className="login-link mt-2">
                Have an Account? <Link to="/login">Click here to login</Link>
              </div>
            </Card.Footer>
          </Form>
        )}
      </Card>
    </div>
  );
}
