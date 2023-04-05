import { Card, Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { ProfileModal } from "../components/Modal";
import { useContext, useState } from "react";
import { TokenContext } from "../App";
import { Header } from "../components/Header";

export function Profile() {
  const { token } = useContext(TokenContext);
  const [userEmail, setUserEmail] = useState("");
  const options = {
    method: "GET",
    headers: { authorization: token },
    "Content-Type": "application/json",
  };
  fetch("http://localhost:3000/api/auth/", options)
    .then((data) => data.json())
    .then((data) => {
      setUserEmail(data);
    })
    .catch((error) => {
      alert("503 - Service Unavailable");
      console.log("Error! Check if server is up and running");
      console.error(error);
    });

  return (
    <>
      <Navbar />
      <Container>
        <Header />
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/src/assets/avatar-placeholder.png" />
          <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <Card.Text>Email: {userEmail}</Card.Text>
            <ProfileModal />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
