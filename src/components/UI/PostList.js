import styled from "styled-components";
import Post from "./Post";

const PostList = (props) => {
  return (
    <Style>
      {props.posts.length > 0 ? (
        props.posts.map((post, i) => {
          return (
            <li key={i}>
              <Post post={post} />
            </li>
          );
        })
      ) : (
        <p style={{ textAlign: "center", marginTop: "100px" }}>
          Nothing to see here yet :(
        </p>
      )}
    </Style>
  );
};

export default PostList;

const Style = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
`;
