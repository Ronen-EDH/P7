import "../styles/Main.css";
import { Posts } from "../components/Posts";
import { CreatePost } from "../components/CreatePost";
import { useState, useEffect } from "react";
import { postData } from "../datas/PostData";

// Do I need to use useEffect() here and why?
// Maybe becuase if someone adds a post while you are online you won't see it otherwise, only when you refresh?
/* function fetchPosts(token) {
  const options = {
    method: "GET",
    headers: { authorization: token },
    "Content-type": "application/json",
  };

  return fetch("http://localhost:3000/api/posts/", options)
    .then((data) => data.json())
    .catch((error) => {
      alert("503 - Service Unavailable");
      console.log("Error! Check if server is up and running");
      console.error(error);
    });
}

const studentCount = useEffect(() => {
  const config = {
    headers: { "x-auth-token": token },
    "Content-type": "application/json",
  };

  api.get("/students/", {}, config).then((response) => {
    setCount(response.data);
  });
}, [token]); */

/* const fetchPosts = useEffect(() => {
  const options = {
    method: "GET",
    headers: { authorization: token },
    "Content-type": "application/json",
  };
  fetch("http://localhost:3000/api/posts/", options)
    .then((data) => data.json())
    .catch((error) => {
      alert("503 - Service Unavailable");
      console.log("Error! Check if server is up and running");
      console.error(error);
    });
    
}, [token]); */

// function fetchPosts() {
//   return useEffect(() => {
//     fetch("http://localhost:3000/api/posts/")
//       .then((data) => data.json())
//       .catch((error) => {
//         alert("503 - Service Unavailable");
//         console.log("Error! Check if server is up and running");
//         console.error(error);
//       });
//   }, []);
// }
// const postsDb = fetchPosts();
// console.log("postsDb", postsDb);

export function Main(props) {
  /*   const postsDb = useEffect(() => {
    const options = {
      method: "GET",
      headers: { authorization: props.token },
      "Content-type": "application/json",
    };
    return fetch("http://localhost:3000/api/posts/", options)
      .then((data) => data.json())
      .catch((error) => {
        alert("503 - Service Unavailable");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  }, [props.token]);

  console.log("postsDb:", postsDb); */

  async function fetchPosts() {
    const options = {
      method: "GET",
      headers: { authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3ODgyMDI3MywiZXhwIjoxNjc4OTA2NjczfQ.DTU2dd9keabExSwgjvVYPq0wNLWMdYkXjldQAI9qQsY" },
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:3000/api/posts/", options)
      .then((data) => data.json())
      .catch((error) => {
        alert("503 - Service Unavailable");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
    // return [2, 3, 4];
  }
  const postsDb = fetchPosts();
  console.log("postsDb:", postsDb);

  const [posts, setPosts] = useState(postData);
  console.log("posts:", posts);

  const addNewPost = (title, text) => {
    return setPosts((prevPosts) => [...prevPosts, { title: title, text: text, img: postData[0].img, isRead: true }]);
  };

  return (
    <div>
      <CreatePost posts={posts} funcSetPosts={setPosts} funcNewPost={addNewPost} />
      <Posts posts={posts} funcSetPosts={setPosts} />
    </div>
  );
}
