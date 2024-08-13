import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Footer.css"

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mt-auto">
      <Container>
        <Navbar.Brand as={Link} to="/home">UMTC</Navbar.Brand>
        <Navbar.Toggle aria-controls="footer-navbar-nav" />
        <Navbar.Collapse id="footer-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">Contact Us</Nav.Link>
            {/* <Nav.Link as={Link} to="/privacy">Privacy Policy</Nav.Link>
            <Nav.Link as={Link} to="/terms">Terms of Service</Nav.Link> */}
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Text>
              Created by Jesse Shen
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;
