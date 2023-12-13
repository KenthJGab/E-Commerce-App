import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import UserContext from '../UserContext';

import zuittLogo from '../images/Shop.png';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={zuittLogo}
            width="100"
            height="100"
            className="d-inline-block align-top pt-2"
            alt="Zuitt Logo"
          />
        <Link to="/user-cart" className="glow-on-hover">
          <img
            src="https://i.ibb.co/M53pGG6/2.png"
            alt="Cart Logo"
            className="img-fluid cart-icon pb-3"
            style={{ height: '87px'}}
          />
        </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact className="glow-on-hover text-white fs-6 mt-1">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products" exact className="glow-on-hover text-white fs-6 mt-1">
              Products
            </Nav.Link>
            {user.id !== null ? (
              <>
                {!user.isAdmin && (
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={
                      <img
                        src="https://i.ibb.co/hg9Q3F1/Untitled-design-1.png"
                        alt="Account Icon"
                        className="img-fluid account-icon pb-3 "
                        style={{ height: '63px' }}
                      />
                    }
                  >
                    {user.isAdmin ? (
                      <>
                        <Dropdown.Item>
                          <Link to="/addProduct" className="glow-on-hover">
                            Add Product
                          </Link>
                        </Dropdown.Item>
                      </>
                    ) : null}

                    {!user.isAdmin && (
                      <>
                        <Dropdown.Item>
                          <Link to="/profile" className="glow-on-hover">
                            Profile
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/order-history" className="glow-on-hover">
                            Order History
                          </Link>
                        </Dropdown.Item>
                      </>
                    )}

                    <Dropdown.Item>
                      <Link to="/logout" className="glow-on-hover">
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </DropdownButton>
                )}
                {user.isAdmin && (
                  <Nav.Link as={NavLink} to="/logout" exact className="glow-on-hover text-white fs-6 mt-1">
                    Logout
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact className="glow-on-hover text-white fs-6 mt-1">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact className="glow-on-hover text-white fs-6 mt-1">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
