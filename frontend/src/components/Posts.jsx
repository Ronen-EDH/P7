import CardGroup from "react-bootstrap/CardGroup";
import { Post } from "./Post";
import styled from "styled-components";

export const Posts = ({ posts, funcSetPosts }) => {
  // console.log(posts);
  const mapOfPosts = posts.map((post, i) => (
    // console.log(post);
    <Post title={post.title} text={post.text} img={post.img} isRead={post.isRead} key={i} index={i} posts={posts} funcSetPosts={funcSetPosts} />
  ));
  return <CardGroup>{mapOfPosts}</CardGroup>;
};

// const StyledCardGroup = styled(CardGroup)`
//   /* display: flex; */
//   gap: 2%;
// `;
