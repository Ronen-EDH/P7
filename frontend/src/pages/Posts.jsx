import { useState, useEffect, useContext } from "react";
import { CreatePost } from "../components/CreatePost";
import Navbar from "../components/Navbar";
import { Post } from "../components/Post";
import { Container } from "react-bootstrap";
import { TokenContext } from "../App";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

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
    return <Post title={post.title} text={post.text} file={post.file} altText={post.altText} id={post.id} key={i} index={i} />;
  });

  return (
    <>
      <Navbar />
      <Header />
      <CreatePost funcNewPost={addNewPost} />
      <Container className="m-3 p-0 d-flex flex-wrap">{mapOfPosts}</Container>
    </>
  );
}
