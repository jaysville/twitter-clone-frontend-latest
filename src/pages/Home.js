import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useGetAllPostsQuery } from "../redux/api/postApi";
import Post from "../components/UI/Post";
import { useSelector } from "react-redux/es/hooks/useSelector";
import PostList from "../components/UI/PostList";
import { notification } from "antd";
import { PostBtn } from "../components/UI/Buttons";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { data, isLoading, error, isError, isSuccess } = useGetAllPostsQuery();

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    console.log(data, error);
    if (!isLoading && isSuccess) {
      console.log(user);
      console.log(token);
      setPosts(data?.posts);
    }
    if (!isLoading && isError) {
      notification.error({
        message: "Failed to fetch posts.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, isLoading, user, isSuccess, token, isError]);

  return (
    <Style>
      <Nav>
        <li>For You</li>
        <li>Following</li>
      </Nav>
      <hr />
      <div>
        <PostBtn
          onclick={() => {
            navigate("/create-post");
          }}
        />
        {isLoading && <p>Loading....</p>}
        {!isLoading && isSuccess && <PostList posts={posts} />}
        {!isLoading && isError && <p>Something went wrong</p>}
      </div>
    </Style>
  );
};

const Style = styled.div``;

const Nav = styled.ul`
  display: flex;
  padding-inline-start: 0;
  justify-content: space-around;
  list-style-type: none;

  li {
  }
`;

export default Home;
