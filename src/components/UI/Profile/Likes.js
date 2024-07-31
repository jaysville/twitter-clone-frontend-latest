import { useEffect } from "react";
import { notification } from "antd";
import PostList from "../PostList";
import { useOutletContext } from "react-router-dom";
import { useFetchUserLikesQuery } from "../../../redux/api/postApi";

const Likes = () => {
  const [userId] = useOutletContext();

  const { data, isLoading, error, isError, isSuccess } =
    useFetchUserLikesQuery(userId);

  useEffect(() => {
    if (!isLoading && isError) {
      console.log(error);
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

export default Likes;
