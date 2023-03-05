import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";

export default function CreatePost(props) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="post__Title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="post__Textarea1">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <StyledWrap>
        <Button onClick={props.func} variant="primary">
          Post
        </Button>{" "}
      </StyledWrap>
    </Form>
  );
}

const StyledWrap = styled.div`
  margin: 1em 0em 2em 0em;
`;
