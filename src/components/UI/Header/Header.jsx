import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const dispatch=useDispatch()
  const history=useHistory()
  const auth = useSelector((state) => state.auth);
  const logoutHandler=()=>{
    dispatch(authActions.signout())
    history.replace("/signin")
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {!auth.isAuthenticated && (
          <Navbar.Brand href="#home">
            Please Login to access your Mail Box
          </Navbar.Brand>
        )}
        {auth.isAuthenticated && (
          <>
            <Navbar.Brand >Welcome to your Mail Box</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Sign Out</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
