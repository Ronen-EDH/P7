import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

export function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addNewPost = () => {
    // console.log("I have been clicked");
    return props.funcSetPosts((prevPosts) => [...prevPosts, { title: title, text: text, img: "https://picsum.photos/300/200", isRead: true }]);
  };

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
        <Form.Control type="file" />
      </Form.Group>
      <StyledWrap>
        <Button
          onClick={() => {
            addNewPost();
            setTitle("");
            setText("");
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
