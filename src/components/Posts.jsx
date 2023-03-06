import CardGroup from "react-bootstrap/CardGroup";
import { Post } from "./Post";

export const Posts = ({ posts, funcDeletePost, funcToggle }) => {
  // console.log(posts);
  const mapOfPosts = posts.map((post, i) => (
    // console.log(post);
    <Post title={post.title} text={post.text} img={post.img} isRead={post.isRead} key={i} funcDeletePost={funcDeletePost} funcToggle={funcToggle} index={i} />
  ));
  return <CardGroup>{mapOfPosts}</CardGroup>;
};
