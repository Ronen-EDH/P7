import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

export function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  function sendPost() {
    const post = {};
    post.title = title;
    post.text = text;
    post.img = "https://picsum.photos/300/200";

    const options = {
      method: "POST",
      headers: { authorization: userInfo.token },
      "Content-Type": "application/json",
      body: JSON.stringify(post),
    };
    fetch("http://localhost:3000/api/posts/", options)
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        alert("503 - Service Unavailable");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="post__Title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="post__Textarea1">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" name="image" />
      </Form.Group>
      <StyledWrap>
        <Button
          onClick={() => {
            props.funcNewPost(title, text);
            setTitle("");
            setText("");
            sendPost();
          }}
          disabled={title == "" || text == ""}
          variant="primary"
        >
          Post
        </Button>{" "}
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
