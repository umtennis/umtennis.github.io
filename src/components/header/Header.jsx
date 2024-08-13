import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  let navigate = useNavigate(); 

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">UM Tennis Club</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/rules">Club Rules</Nav.Link>
          <Nav.Link as={Link} to="/programs">Programs</Nav.Link>
          <Nav.Link as={Link} to="/about">About Us</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {userLogin(props, navigate)}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function userLogin(state, navigate) {
  if (state.isLoggedIn) {
    return (
      <>
        Signed in as: <a href="#login">{state.user.name}</a>
        <button 
          className="btn btn-light" 
          type="submit"
          onClick={() => navigate('/book')}
        >
          Book Sessions
        </button>
      </>
    );
  } else {
    return (
      <button 
        className="btn btn-light" 
        onClick={(e) => {
          e.preventDefault();
          navigate('/login');
        }}
      >
        Login
      </button>
    );
  }
}

export default Header;
