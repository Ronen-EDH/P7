import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const { updateToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Try
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    };

    // Put it in a try-catch statment instead just .catch, look it up
    const response = await fetch("http://localhost:3000/api/auth/signin", options).catch((err) => {
      console.log("Error: ", err);
      alert("503 - Service Unavailable");
    });
    if (response.status === 500) {
      const res = await response.json();
      alert("Internal server error, please contact support!");
      throw new Error(res.error);
    } else if (response.status === 401) {
      const res = await response.json();
      setError(res.error);
    } else {
      const body = await response.json();
      // Better way on backend
      if (body.token) {
        updateToken(body.token);
        setEmail("");
        setPass("");
        navigate("/posts");
      } else {
        console.log("Token is missing");
        alert("Internal server error, please contact support!");
      }
    }
    // catch
  };

  return (
    <>
      <Navbar />
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password" />
          {error && <p style={{ color: "#d1515a" }}>{error}</p>}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={email == "" || pass == ""}>
          Sign In
        </Button>
      </Form>
    </>
  );
}
