import { useSelector } from "react-redux";
import { useFetchUserPostsQuery } from "../../../redux/api/userApi";
import { useEffect } from "react";
import { notification } from "antd";
import PostList from "../PostList";
import { useOutletContext } from "react-router-dom";

const Posts = () => {
  const [userId] = useOutletContext();

  const { data, isLoading, error, isError, isSuccess } =
    useFetchUserPostsQuery(userId);

  useEffect(() => {
    console.log(data);
    if (!isLoading && isError) {
      notification.error({
        message: "Failed to fetch posts.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, isLoading, isError]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>Something went wrong</p>}
      {!isLoading && isSuccess && <PostList posts={data?.posts} />}
    </>
  );
};

export default Posts;
