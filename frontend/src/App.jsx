import "./App.css";
import { Posts } from "./components/Posts";
import { CreatePost } from "./components/CreatePost";
import { useState } from "react";
import { postData } from "./datas/PostData";

export function App() {
  const [posts, setPosts] = useState(postData);

  // const addNewPost = (title, text) => {
  //   // console.log("I have been clicked");
  //   return setPosts((prevPosts) => [...prevPosts, { title: title, text: text, img: postData[0].img, isRead: true }]);
  // };

  // const deletePost = (index) => {
  //   const newPosts = [...posts];
  //   newPosts.splice(index, 1);
  //   setPosts(newPosts);
  // };

  // const toggle = (idx) => setPosts(posts.map((post, i) => (i == idx ? { ...post, isRead: !post.isRead } : post)));

  return (
    <div>
      <CreatePost posts={posts} funcSetPosts={setPosts} />
      <Posts posts={posts} funcSetPosts={setPosts} />
    </div>
  );
}
