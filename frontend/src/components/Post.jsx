import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

export function Post({ title, text, img, isRead, index, posts, funcSetPosts }) {
  // console.log("posts", posts);
  const toggle = (idx) => funcSetPosts(posts.map((post, i) => (i == idx ? { ...post, isRead: !post.isRead } : post)));

  const deletePost = (index, posts) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    funcSetPosts(newPosts);
  };

  return (
    <StyledCard>
      <Card.Img variant="top" src={img} alt="..." />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        {isRead ? (
          <Button variant="secondary">Read</Button>
        ) : (
          <Button variant="primary" onClick={() => toggle(index)}>
            Unread
          </Button>
        )}
        {/* <Button variant="secondary">Read</Button> */}
        <Button variant="danger" onClick={() => deletePost(index, posts)}>
          Delete
        </Button>
      </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  min-width: 280px;
`;
