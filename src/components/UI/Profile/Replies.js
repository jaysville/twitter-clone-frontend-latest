import { useEffect } from "react";
import { notification } from "antd";
import PostList from "../PostList";
import { useOutletContext } from "react-router-dom";
import { useFetchUserRepliesQuery } from "../../../redux/api/postApi";

const Replies = () => {
  const [userId] = useOutletContext();

  const { data, isLoading, isError, isSuccess } =
    useFetchUserRepliesQuery(userId);

  useEffect(() => {
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

export default Replies;
