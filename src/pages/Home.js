import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useGetAllPostsQuery } from "../redux/api/postApi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import PostList from "../components/UI/PostList";
import { notification } from "antd";
import { PostPageBtn } from "../components/UI/Buttons";

import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { data, isLoading, error, isError, isSuccess } = useGetAllPostsQuery();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isSuccess) {
      setPosts(data?.posts);
    }
    if (isError) {
      notification.error({
        message: "Failed to fetch posts.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, isSuccess, user, isError]);

  return (
    <Style>
      <Nav>
        <li>For You</li>
        <li>Following</li>
      </Nav>
      <hr />
      <div>
        {isLoading && <p>Loading....</p>}
        {!isLoading && isSuccess && <PostList posts={posts} />}
        {!isLoading && isError && <p>Something went wrong</p>}
        <PostPageBtn />
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
