import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";

export default function CreatePost(props) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="post__Title">
        <Form.Label>Title</Form.Label>
        {/* <Form.Control type="text" value={props.value} onChange={(e) => setNewItem(e.target.value)} /> */}
        {props.funcNewTitle}
      </Form.Group>
      <Form.Group className="mb-3" controlId="post__Textarea1">
        <Form.Label>Text</Form.Label>
        {/* <Form.Control as="textarea" rows={3} /> */}
        {props.funcNewText}
      </Form.Group>
      <StyledWrap>
        <Button onClick={props.funcNewPost} disabled={props.postDisabled} variant="primary">
          Post
        </Button>{" "}
      </StyledWrap>
    </Form>
  );
}

const StyledWrap = styled.div`
  margin: 1em 0em 2em 0em;
`;
