import styled from "styled-components";
import Post from "./Post";

const PostList = (props) => {
  return (
    <Style>
      {props.posts.map((post, i) => {
        return (
          <li key={i}>
            <Post post={post} />
          </li>
        );
      })}
    </Style>
  );
};

export default PostList;

const Style = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
`;
