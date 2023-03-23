import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

export function Post({ title, text, img, id, index, posts, funcSetPosts }) {
  const [isRead, setIsRead] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log("id:", id);

  useEffect(() => {
    const options = {
      method: "POST",
      headers: { authorization: userInfo.token, "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };

    fetch("http://localhost:3000/api/posts/read/", options)
      .then((response) => response.json())
      .then((data) => {
        setIsRead(data);
        console.log("isRead:", isRead);
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("503 - Service Unavailable");
      });
  }, []);

  // This one need to be fixed
  const toggle = (idx) =>
    funcSetPosts(
      posts.map((post, i) => {
        i == idx ? { ...post, isRead: !post.isRead } : post;
      })
    );

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

// let isRead = false;
// console.log("id:", id);

//This part probably should happen in posts
// const [isRead, setIsRead] = useState(false);

/*  useEffect(() => {
    fetch("http://localhost:3000/api/posts/read/")
      .then((response) => response.json())
      .then((readPosts) => {
        // console.log("readPosts:", readPosts);
        readPosts.forEach(function (post) {
          // console.log(post.postId);
          if (post.postId == id) {
            console.log("This was read");
            setIsRead(true);
          }
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("503 - Service Unavailable");
      });
  }, []); */

// console.log("This comes after fetch");
