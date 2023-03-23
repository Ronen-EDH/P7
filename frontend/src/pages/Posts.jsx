import "../styles/Posts.css";
import { useState, useEffect } from "react";
import { CreatePost } from "../components/CreatePost";
import Navbar from "../components/Navbar";
import { Post } from "../components/Post";
import { CardGroup } from "react-bootstrap";
import { postData } from "../datas/PostData";

// Do I need to use useEffect() here and why?
// Maybe becuase if someone adds a post while you are online you won't see it otherwise, only when you refresh?

export function Posts({ isUserLogedIn, funcSetIsUserLogedIn }) {
  const [posts, setPosts] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("userInfo:", userInfo);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { authorization: userInfo.token },
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

  console.log("postsDb:", posts);

  const addNewPost = (title, text) => {
    return setPosts((prevPosts) => [...prevPosts, { title: title, text: text, img: posts[0].img, isRead: true }]);
  };

  const mapOfPosts = posts.map((post, i) => {
    return <Post title={post.title} text={post.text} img={post.img} id={post.id} key={i} index={i} posts={posts} funcSetPosts={setPosts} />;
  });

  return (
    <div>
      <Navbar isUserLogedIn={isUserLogedIn} funcSetIsUserLogedIn={funcSetIsUserLogedIn} />
      <CreatePost funcNewPost={addNewPost} />
      <CardGroup>{mapOfPosts}</CardGroup>;
    </div>
  );
}
