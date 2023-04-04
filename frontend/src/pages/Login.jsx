import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../App";
import { FormValidation } from "../components/FormValidationLogin";

export function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [goToPostPage, setGoToPostPage] = useState(false);
  // const [validated, setValidated] = useState(false);
  const { updateToken } = useContext(TokenContext);
  const [error, setError] = useState(null);
  // const [errors, setErrors] = useState({});

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
    /*     const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false) {
    }
    setValidated(true); */

    e.preventDefault();

    // setErrors(FormValidation(email, pass));

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
    if (response.status === 500) {
      const res = await response.json();
      alert("Internal server error, please contact support!");
      throw new Error(res.error);
    } else if (response.status === 401) {
      const res = await response.json();
      setError(res.error);
      // setErrors({
      //   ...errors,
      //   pass: res.error,
      // });
    } else {
      const body = await response.json();
      // Do I have to count for this too?
      // if (!body) {
      //   return null;
      // }
      updateToken(body.token);
      console.log("body:", body);
      setEmail("");
      setPass("");
      setGoToPostPage(true);
    }
  };

  return (
    <>
      <Navbar />
      {/* <Form onSubmit={handleSubmit}> */}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
          {/* {errors.email && <p style={{ color: "#d1515a" }}>{errors.email}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter password" />
          {/* {errors.pass && <p style={{ color: "#d1515a" }}>{errors.pass}</p>} */}
          {error && <p style={{ color: "#d1515a" }}>{error}</p>}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={email == "" || pass == ""}>
          Login
        </Button>
      </Form>
    </>
  );
}
