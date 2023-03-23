import "../styles/Main.css";
import { Posts } from "../components/Posts";
import { CreatePost } from "../components/CreatePost";
import { useState, useEffect } from "react";
import { postData } from "../datas/PostData";
import Navbar from "../components/Navbar";

// Do I need to use useEffect() here and why?
// Maybe becuase if someone adds a post while you are online you won't see it otherwise, only when you refresh?

export function Main({ isUserLogedIn, funcSetIsUserLogedIn }) {
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

  return (
    <div>
      <Navbar isUserLogedIn={isUserLogedIn} funcSetIsUserLogedIn={funcSetIsUserLogedIn} />
      <CreatePost posts={posts} funcSetPosts={setPosts} funcNewPost={addNewPost} />
      <Posts posts={posts} funcSetPosts={setPosts} />
    </div>
  );
}
