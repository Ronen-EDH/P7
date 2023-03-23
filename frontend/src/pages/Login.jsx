import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { fetchNow } from "./Test";

export function Login({ funcSetIsUserLogedIn }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [goToPostPage, setGoToPostPage] = useState(false);

  // fetchNow().then((say) => console.log(say));

  // .........
  // const [token, setToken] = useState("");
  // https://beta.reactjs.org/learn/passing-data-deeply-with-context

  // useEffect(() => {
  //   if (goToPostPage) {
  //     <Navigate to="/posts" />;
  //   }
  // }, [goToPostPage]);

  // Not sure why but this one works only here
  // and without the useEffect(which would have made more sense to me)
  // How does it even run this part AFTER the handleSubmit() ?
  if (goToPostPage) {
    return <Navigate to="/posts" />;
  }

  const handleSubmit = async (e) => {
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

    const response = await fetch("http://localhost:3000/api/auth/login", options).catch((err) => {
      console.log("Error: ", err);
      alert("503 - Service Unavailable");
    });
    if (response.status != 200) return alert("Invalid email or password");

    // window.location.href = "http://localhost:3000/api/posts/";

    const body = await response.json();
    if (!body) {
      return null;
    }
    localStorage.setItem("userInfo", JSON.stringify(body));
    console.log("body:", body);
    setEmail("");
    setPass("");
    setGoToPostPage(true);
    funcSetIsUserLogedIn(true);
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
