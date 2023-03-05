import "./App.css";
import { Posts } from "./components/Posts";
import CreatePost from "./components/CreatePost";
import { useState } from "react";
import Form from "react-bootstrap/Form";

function App() {
  const [posts, setPosts] = useState([
    {
      title: "Good Title",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam doloribus eum, maxime consectetur adipisci veniam.",
    },
  ]);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // <input type="text" onChange={(e) => setTitle(e.target.value)}>
  // <input type="text" onChange={(e) => setText(e.target.value)}>
  const newTitle = () => {
    return <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />;
  };

  // console.log("title:", title);

  const newText = () => {
    return <Form.Control as="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value)} />;
  };

  const addNewPost = () => {
    // console.log("I have been clicked");
    return setPosts((prevPosts) => [...prevPosts, { title: title, text: text }]);
  };

  return (
    <div>
      <CreatePost funcNewPost={addNewPost} funcNewTitle={newTitle()} funcNewText={newText()} postDisabled={title == "" || text == ""} />
      <Posts posts={posts} />
    </div>
  );
}

export default App;
