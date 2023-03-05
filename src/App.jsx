import "./App.css";
import { Posts } from "./components/Posts";
import CreatePost from "./components/CreatePost";
import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      title: "Good Title",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam doloribus eum, maxime consectetur adipisci veniam.",
    },
  ]);

  const addNewPost = () => {
    console.log("I have been clicked");
    return setPosts((prevPosts) => [...prevPosts, { title: "Whatever", text: "Whatever" }]);
  };

  return (
    <div>
      <CreatePost func={addNewPost} />
      <Posts posts={posts} />
    </div>
  );
}

export default App;
