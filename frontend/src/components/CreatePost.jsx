import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState, useContext } from "react";
import { TokenContext } from "../App";

export function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [altText, setAltText] = useState("");
  const { token } = useContext(TokenContext);

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const options = {
      method: "POST",
      headers: { authorization: token },
      body: formData,
    };
    fetch("http://localhost:3000/api/posts/", options)
      .then((res) => res.json())
      .then((post) => {
        if (post.message) {
          alert(post.message);
        } else {
          props.funcNewPost(post);
          setTitle("");
          setText("");
          setFile("");
          setAltText("");
        }
      })
      .catch((error) => {
        alert("503 - Service Unavailable");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  };

  return (
    <>
      <Form className="mb-5" onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3" controlId="post__Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="post__Textarea1">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" rows={3} value={text} name="text" onChange={(e) => setText(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload file</Form.Label>
          <Form.Control type="file" value={file} name="file" onChange={(e) => setFile(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="post__AltText">
          <Form.Label>Alternative text</Form.Label>
          {/* Please describe your image to help people of all abilities engage with your content */}
          <Form.Control type="text" value={altText} placeholder="Please describe your image" name="altText" onChange={(e) => setAltText(e.target.value)} />
        </Form.Group>
        <Button disabled={title == ""} variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </>
  );
}
