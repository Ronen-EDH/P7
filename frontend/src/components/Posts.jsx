import CardGroup from "react-bootstrap/CardGroup";
import { Post } from "./Post";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const Posts = ({ posts, funcSetPosts }) => {
  const [idsOfRead, setIdsOfRead] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/read/")
      .then((response) => response.json())
      .then((readPosts) => {
        setIdsOfRead(readPosts);
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("503 - Service Unavailable");
      });
  }, []);
  // console.log(posts);
  let isRead;

  const mapOfPosts = posts.map((post, i) => {
    // console.log(typeof post.id);

    isRead = idsOfRead.includes(parseInt(post.id));
    // console.log(isRead);

    return <Post title={post.title} text={post.text} img={post.img} isRead={isRead} key={i} index={i} posts={posts} funcSetPosts={funcSetPosts} />;
  });
  return <CardGroup>{mapOfPosts}</CardGroup>;
};

// const StyledCardGroup = styled(CardGroup)`
//   /* display: flex; */
//   gap: 2%;
// `;

/* export const Posts = ({ posts, funcSetPosts }) => {
    const [id, setId] = useState("");
    const [isRead, setIsRead] = useState(false);
  
    useEffect(() => {
      fetch("http://localhost:3000/api/posts/read/")
        .then((response) => response.json())
        .then((readPosts) => {
          // console.log("readPosts:", readPosts);
          readPosts.forEach(function (post) {
            // console.log("post.postId", post.postId);
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
    }, []);
    // console.log(posts);
    const mapOfPosts = posts.map((post, i) => {
      // console.log(post);
      setId(post.id);
      return <Post title={post.title} text={post.text} img={post.img} isRead={isRead} key={i} index={i} posts={posts} funcSetPosts={funcSetPosts} />;
    });
    return <CardGroup>{mapOfPosts}</CardGroup>;
  }; */
