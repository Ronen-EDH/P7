import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {};
    body.username = username;
    body.password = pass;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const x = fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => {
        if (res.status === 200) location.href = "http://localhost:5173/posts";
      })
      // .then((location.href = "http://localhost:5173/posts"))
      .catch((err) => {
        console.log("Error: ", err);
        alert("503 - Service Unavailable");
      });

    setUsername("");
    setPass("");
  };

  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
