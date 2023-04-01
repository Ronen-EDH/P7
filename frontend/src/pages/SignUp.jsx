import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [isPassValid, setIsPassValid] = useState(false);
  const navigate = useNavigate();
  const { updateToken } = useContext(TokenContext);
  const [validated, setValidated] = useState(false);
  let isPassValid;

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    // minLength: 8,
    // minLowercase: 1,
    // minUppercase: 1,
    // minNumbers: 1,
    // minSymbols: 1
    const regex = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
    isPassValid = regex.test(pass);
    console.log("isPassValid:", isPassValid);
    if (isPassValid) setValidated(true);
    /*     if (!isPassValid) {
      // return alert("Password is not strong enough. The password must contain the following:\n- minimum of 8 characters\n- minimum 1 lower case letter\n- minimum 1 upper case letter\n- minimum 1 number\n- minimum 1 symbol");
      return;
    } */

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
    if (response.status != 200) return alert("Invalid email or password");

    const res = await response.json();
    if (!res) {
      return null;
    }
    updateToken(res.token);
    setEmail("");
    setPass("");
    navigate("/posts");
  };

  return (
    <>
      <Navbar />
      {/* <Form onSubmit={handleSubmit}> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password" />
          <Form.Control.Feedback type="invalid">Password is not strong enough. The password must contain the following:\n- minimum of 8 characters\n- minimum 1 lower case letter\n- minimum 1 upper case letter\n- minimum 1 number\n- minimum 1 symbol</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
