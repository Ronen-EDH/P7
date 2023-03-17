import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {};
    body.email = email;
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

    setEmail("");
    setPass("");
  };

  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
