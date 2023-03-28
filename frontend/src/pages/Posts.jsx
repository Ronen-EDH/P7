import "../styles/Posts.css";
import { useState, useEffect, useContext } from "react";
import { CreatePost } from "../components/CreatePost";
import Navbar from "../components/Navbar";
import { Post } from "../components/Post";
import { CardGroup } from "react-bootstrap";
import { postData } from "../datas/PostData";
import { TokenContext } from "../App";

// Do I need to use useEffect() here and why?
// Maybe becuase if someone adds a post while you are online you won't see it otherwise, only when you refresh?

export function Posts() {
  const { token } = useContext(TokenContext);
  console.log("contextToken:", token);
  const [posts, setPosts] = useState([]);
  // console.log("userInfo:", userInfo);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { authorization: token },
      "Content-Type": "application/json",
    };
    fetch("http://localhost:3000/api/posts/", options)
      .then((data) => data.json())
      .then((postsDb) => setPosts(postsDb))
      .catch((error) => {
        alert("503 - Service Unavailable");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  }, []);

  // console.log("postsDb:", posts);

  const addNewPost = (post) => {
    return setPosts((prevPosts) => [...prevPosts, { id: post.id, title: post.title, text: post.text, img: post.img }]);
  };

  const mapOfPosts = posts.map((post, i) => {
    // console.log("post:", post);
    return <Post title={post.title} text={post.text} img={post.img} id={post.id} key={i} index={i} posts={posts} funcSetPosts={setPosts} />;
  });

  return (
    <div>
      <Navbar />
      <CreatePost funcNewPost={addNewPost} />
      <CardGroup>{mapOfPosts}</CardGroup>
    </div>
  );
}
