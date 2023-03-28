import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { useState, useContext } from "react";
import { TokenContext } from "../App";

export function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const { token } = useContext(TokenContext);

  /*   function sendPost() {
    const post = {};
    post.title = title;
    post.text = text;
    post.img = "https://picsum.photos/300/200"; */

  // const submitForm = (e) => {
  //   console.log("Form is submitted")
  // }

  // I'm not really sure how this e/e.target works
  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // formData.append("title", title);
    // formData.append("text", text);
    // formData.append("img", img);

    const options = {
      method: "POST",
      headers: { authorization: token },
      // "Content-Type": "application/json",
      body: formData,
    };
    fetch("http://localhost:3000/api/posts/", options)
      .then((res) => res.json())
      .then((post) => {
        // Display: "Post created successfully!"
        console.log("Success:", post.id);
        // console.log("post.body:", post.body);
        props.funcNewPost(post);
        setTitle("");
        setText("");
      })
      .catch((error) => {
        alert("503 - Service Unavailable");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  };

  return (
    <Form onSubmit={(e) => submitForm(e)}>
      <Form.Group className="mb-3" controlId="post__Title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="post__Textarea1">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows={3} value={text} name="text" onChange={(e) => setText(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" name="image" onChange={(e) => setImg(e.target.files[0])} />
      </Form.Group>
      <StyledWrap>
        <Button
          /*           onClick={() => {
            props.funcNewPost(title, text);
            setTitle("");
            setText("");
            // sendPost();
          }} */
          disabled={title == "" || text == ""}
          variant="primary"
          type="submit"
        >
          Post
        </Button>
      </StyledWrap>
    </Form>
  );
}

const StyledWrap = styled.div`
  margin: 1em 0em 2em 0em;
`;

// const StyledButton = styled(Button)`
//   color: purple;
// `;
