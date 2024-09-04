import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  useFetchFollowingPostsQuery,
  useGetAllPostsQuery,
} from "../redux/api/postApi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import PostList from "../components/UI/PostList";
import { notification } from "antd";
import { PostPageBtn } from "../components/UI/Buttons";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [feed, setFeed] = useState("");

  const { data, isLoading, isError, isSuccess } = useGetAllPostsQuery();
  const {
    data: followingPosts,
    isLoading: followingPostsIsLoading,
    isSuccess: followingPostsIsSuccess,
  } = useFetchFollowingPostsQuery();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isSuccess && feed === "") {
      setPosts(data?.posts);
    } else if (followingPostsIsSuccess && feed === "following") {
      setPosts(followingPosts);
    } else {
      setFeed("");
    }

    if (isError) {
      notification.error({
        message: "Failed to fetch posts.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [
    data,
    isSuccess,
    user,
    isError,
    followingPosts,
    followingPostsIsSuccess,
    feed,
  ]);

  return (
    <Style>
      <Nav>
        <NavLink
          active={feed === ""}
          onClick={() => {
            setFeed("");
          }}
        >
          For You
        </NavLink>
        <NavLink
          onClick={() => {
            setFeed("following");
          }}
          active={feed === "following"}
        >
          Following
        </NavLink>
      </Nav>
      <hr />
      <div>
        {(isLoading || followingPostsIsLoading) && <p>Loading....</p>}
        {(!isLoading || !followingPostsIsLoading) && isSuccess && (
          <PostList posts={posts} />
        )}
        {(!isLoading || !followingPostsIsLoading) && isError && (
          <p>Something went wrong</p>
        )}
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
`;
const NavLink = styled.li`
  cursor: pointer;
  color: ${(props) => props.active && "Cornflowerblue"};
`;

export default Home;
