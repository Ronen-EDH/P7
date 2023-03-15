import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";

export function Login(props) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  // .........
  // const [token, setToken] = useState("");
  // https://beta.reactjs.org/learn/passing-data-deeply-with-context

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: pass,
      }),
    };

    const response = await fetch("http://localhost:3000/api/auth/login", options).catch((err) => {
      console.log("Error: ", err);
      alert("503 - Service Unavailable");
    });
    if (response.status != 200) return alert("Invalid username or password");

    const body = await response.json();

    props.funcSetToken(body.token);
    setUsername("");
    setPass("");
    window.location.href = "http://localhost:3000/api/posts/";
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
