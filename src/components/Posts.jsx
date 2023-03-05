import CardGroup from "react-bootstrap/CardGroup";
import Post from "./Post";

export const Posts = (props) => {
  const mapOfPosts = props.posts.map((post, i) => <Post title={post.title} text={post.text} key={i} />);
  return <CardGroup>{mapOfPosts}</CardGroup>;
};
