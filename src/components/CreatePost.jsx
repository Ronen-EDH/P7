import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

export function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // function Func() {
  //   return props.funcNewPost(title, text), setTitle(""), setText("");
  // }

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
      <StyledWrap>
        <Button
          onClick={() => {
            props.funcNewPost(title, text);
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
