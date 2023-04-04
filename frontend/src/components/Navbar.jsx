import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../App";
import { useLocation } from "react-router-dom";

// {
//   isRead ? (
//     <Button variant="secondary">Read</Button>
//   ) : (
//     <Button variant="primary" onClick={() => toggle(index)}>
//       Unread
//     </Button>
//   );
// }

function NavbarComp() {
  const { token, clearToken } = useContext(TokenContext);
  const location = useLocation();

  // console.log("current location:", location.pathname);

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

  // /src/assets/icon-left-font-monochrome-black.png
  return (
    <Navbar bg="primary" expand="lg" className="navbar-dark">
      <Container>
        <Navbar.Brand>
          <img src="/src/assets/icon-left-font-monochrome-white.svg" width="auto" height="40" className="d-inline-block align-top" alt="Groupomania logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                {renderPath()}
                <Nav.Link href="/login" className="fs-4" onClick={clearToken}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="fs-4">
                  Login
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

// This would be better but might not matter...
{
  /* <Link to="/posts">Sign Up</Link>
<Link to="/login">Login</Link> */
}
