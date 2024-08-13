import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  let navigate = useNavigate(); 

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">UM Tennis Club</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/schedule">Club Schedule</Nav.Link>
            <Nav.Link as={Link} to="/programs">Programs</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Text>
              {userLogin(props, navigate)}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function userLogin(state, navigate) {
  if (state.isLoggedIn) {
    return (
      <>
        <span className="me-2">Signed in as: <a href="#login">{state.user.name}</a></span>
        <Button 
          variant="light" 
          onClick={() => navigate('/book')}
        >
          Book Sessions
        </Button>
      </>
    );
  } else {
    return (
      <Button 
        variant="light" 
        onClick={(e) => {
          e.preventDefault();
          navigate('/login');
        }}
      >
        Login
      </Button>
    );
  }
}

export default Header;
