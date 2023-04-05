import { useState, useEffect, useContext } from "react";
import { CreatePost } from "../components/CreatePost";
import Navbar from "../components/Navbar";
import { Post } from "../components/Post";
import { Col, Container, Row } from "react-bootstrap";
import { TokenContext } from "../App";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import React from "react";

export function Posts() {
  const { token, clearToken } = useContext(TokenContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { authorization: token },
      "Content-Type": "application/json",
    };
    fetch("http://localhost:3000/api/posts/", options)
      .then((data) => {
        if (data.status == 401) {
          clearToken();
          navigate("/signin");
        } else {
          data.json().then((postsDb) => {
            setPosts(postsDb);
          });
        }
      })
      .catch((error) => {
        alert("503 - Service Unavailable");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  }, []);

  const addNewPost = (post) => {
    return setPosts((prevPosts) => [...prevPosts, { id: post.id, title: post.title, text: post.text, file: post.file, altText: post.altText }]);
  };

  const mapOfPosts = posts.map((post, i) => {
    return (
      <React.Fragment key={i}>
        <Col className="mb-4" lg={4} md={6} sm={12}>
          <Post title={post.title} text={post.text} file={post.file} altText={post.altText} id={post.id} index={i} />
        </Col>
      </React.Fragment>
    );
  });

  return (
    <>
      <Navbar />
      <Container>
        <Header />
        <CreatePost funcNewPost={addNewPost} />
        <Row>{mapOfPosts}</Row>
      </Container>
    </>
  );
}
