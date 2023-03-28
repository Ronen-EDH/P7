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

  console.log("current location:", location.pathname);

  function renderPath() {
    let currentLocation = location.pathname;
    if (currentLocation === "/posts") {
      return <Nav.Link href="/profile">Profile page</Nav.Link>;
    } else if (currentLocation === "/profile") {
      return <Nav.Link href="/posts">Posts page</Nav.Link>;
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Groupomania</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                {renderPath()}
                <Nav.Link href="/login" onClick={clearToken}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
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
