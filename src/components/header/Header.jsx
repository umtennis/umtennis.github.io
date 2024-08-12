import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate } from "react-router-dom";

// import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props) {
  let navigate = useNavigate(); 
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">UM Tennis Club</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home" >Home</Nav.Link>
          <Nav.Link href="/rules">Club Rules</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
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

function userLogin(state, navigate){
  if (state.isLoggedIn) {
    return (
      <>
      Signed in as: <a href="#login">state.user.name</a>
      <button class="btn btn-light" type="submit">Book Sessions</button>
      </>
    )
  } else {
    return (
      <button class="btn btn-light" onClick={(e) => {
        e.preventDefault();
        navigate('/login');
        }}>Login</button>
    )
  }
}



// export default CollapsibleExample;

export default Header;