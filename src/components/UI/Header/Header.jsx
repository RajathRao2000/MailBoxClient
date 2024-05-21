import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(authActions.signout());
    history.replace("/signin");
  };
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        {!auth.isAuthenticated && (
          <Navbar.Brand href="#home">
            Please Login to access your Mail Box
          </Navbar.Brand>
        )}
        {auth.isAuthenticated && (
          <>
            <Navbar.Brand>Welcome to your Mail Box</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={logoutHandler}>Sign Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
