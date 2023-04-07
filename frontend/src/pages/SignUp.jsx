import { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";
import { FormValidation } from "../components/FormValidationSignUp";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const { updateToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(FormValidation(email, pass));

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

    const response = await fetch("http://localhost:3000/api/auth/signup", options).catch((err) => {
      console.log("Error: ", err);
      alert("503 - Service Unavailable");
    });
    if (response.status === 500) {
      const res = await response.json();
      if (res.error === "Validation error") {
        setErrors({
          email: "User already exist!",
        });
      } else {
        throw new Error(res.error);
      }
    } else if (response.status != 200) {
      const res = await response.json();
      throw new Error(res.error);
    } else {
      const res = await response.json();
      updateToken(res.token);
      setEmail("");
      setPass("");
      navigate("/posts");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5 d-flex justify-content-center align-items-center">
        <Form noValidate onSubmit={handleSubmit} style={{ width: "300px" }}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
            {errors.email && <p style={{ color: "#d1515a" }}>{errors.email}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password" />
            {errors.pass && <p style={{ color: "#d1515a" }}>{errors.pass}</p>}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={email == "" || pass == ""}>
            Sign Up
          </Button>
        </Form>
      </Container>
    </>
  );
}
