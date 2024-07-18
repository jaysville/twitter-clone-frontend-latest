import { useEffect } from "react";
import { notification } from "antd";
import PostList from "../PostList";
import { useOutletContext } from "react-router-dom";

const Likes = () => {
  const [userId] = useOutletContext();

  //   const { data, isLoading, error, isError, isSuccess } =
  //     useFetchUserPostsQuery(userId);

  //   useEffect(() => {
  //     if (!isLoading && isError) {
  //       console.log(error.status);
  //       notification.error({
  //         message: "Failed to fetch posts.",
  //         duration: 3,
  //         placement: "bottomRight",
  //       });
  //     }
  //   }, [data, isLoading, isError]);

  return (
    <>
      {/* {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>Something went wrong</p>}
      {!isLoading && isSuccess && <PostList posts={data?.posts} />} */}
      <p>User {userId} Likes baby</p>
    </>
  );
};

export default Likes;
