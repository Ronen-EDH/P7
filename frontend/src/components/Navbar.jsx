import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { TokenContext } from "../App";
import { useLocation } from "react-router-dom";

function NavbarComp() {
  const { token, clearToken } = useContext(TokenContext);
  const location = useLocation();

  function renderPath() {
    let currentLocation = location.pathname;
    if (currentLocation === "/posts") {
      return (
        <Nav.Link href="/profile" className="fs-4">
          Profile page
        </Nav.Link>
      );
    } else if (currentLocation === "/profile") {
      return (
        <Nav.Link href="/posts" className="fs-4">
          Posts page
        </Nav.Link>
      );
    }
  }

  return (
    <Navbar bg="primary" expand="lg" className="navbar-dark">
      <Container>
        <Navbar.Brand>
          <img src="/src/assets/icon-left-font-monochrome-white.svg" width="auto" height="40" className="d-inline-block align-top" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                {renderPath()}
                <Nav.Link href="/signin" className="fs-4" onClick={clearToken}>
                  Sign out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/signin" className="fs-4">
                  Sign In
                </Nav.Link>
                <Nav.Link href="/signup" className="fs-4">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
