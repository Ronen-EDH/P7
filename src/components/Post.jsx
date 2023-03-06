import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export function Post({ title, text, img, isRead, funcDeletePost, funcToggle, index }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} alt="..." />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        {isRead ? (
          <Button variant="secondary">Read</Button>
        ) : (
          <Button variant="primary" onClick={() => funcToggle(index)}>
            Unread
          </Button>
        )}
        {/* <Button variant="secondary">Read</Button> */}
        <Button variant="danger" onClick={() => funcDeletePost(index)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
