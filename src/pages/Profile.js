import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
  });
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleUpdateProfile = () => {
    // Make API request to update user profile with updatedDetails
    fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setEditMode(false);
      })
      .catch((error) => console.error('Error updating user profile:', error));
  };

  const handleResetPasswordClick = () => {
    setShowResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false);
  };

  return (
    <>
      {user.token === null ? (
        <Navigate to="/products" />
      ) : (
        <>
          <Row>
            <Col className="p-5 bg-secondary text-white">
              <h1 className="my-5">Profile</h1>
              {!editMode ? (
                <>
                  <h2 className="mt-3">{details.firstName} {details.lastName}</h2>
                  <hr />
                  <h4>Contacts</h4>
                  <ul>
                    <li>Email: {details.email}</li>
                    <li>Mobile No: {details.mobileNo}</li>
                  </ul>
                  <Button variant="dark" onClick={handleEditClick}>
                    Edit Profile
                  </Button>
                  <br/>
                  <br/>
                  <Button variant="dark" onClick={handleResetPasswordClick}>
                    Reset Password
                  </Button>
                </>
              ) : (
                <Form>
                  <h4>Profile Update</h4>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={updatedDetails.firstName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={updatedDetails.lastName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formMobileNo">
                    <Form.Label>Mobile No</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobileNo"
                      value={updatedDetails.mobileNo}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <br/>
                  <Button variant="dark" onClick={handleUpdateProfile}>
                    Save Changes
                  </Button>
                  {' '}
                  <span className="mx-2"></span>
                  <Button variant="dark" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </Form>
              )}
            </Col>
          </Row>
          <Row className="pt mt-4">
            <Col>
              {showResetPassword && <ResetPassword onClose={handleCloseResetPassword} />}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
