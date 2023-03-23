import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

// {
//   isRead ? (
//     <Button variant="secondary">Read</Button>
//   ) : (
//     <Button variant="primary" onClick={() => toggle(index)}>
//       Unread
//     </Button>
//   );
// }

function NavbarComp({ isUserLogedIn, funcSetIsUserLogedIn }) {
  // let isUserLogedIn = true;

  function logOut() {
    localStorage.clear();
    funcSetIsUserLogedIn(false);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Groupomania</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isUserLogedIn ? (
              <Nav.Link href="/login" onClick={logOut}>
                Logout
              </Nav.Link>
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
