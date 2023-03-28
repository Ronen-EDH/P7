import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "../components/Navbar";
import { ProfileModal } from "../components/Modal";

export function Profile() {
  return (
    <>
      <Navbar />
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="/src/assets/avatar-placeholder.png" />
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Card.Text>Email: testapi@email.com</Card.Text>
          {/* <Button onClick={ProfileModal} variant="danger">
            Delete account
          </Button> */}
          <ProfileModal />
        </Card.Body>
      </Card>
    </>
  );
}
