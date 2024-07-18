import PostList from "./PostList";
import { useGetCommentsQuery } from "../../redux/api/postApi";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { notification } from "antd";

const Comments = () => {
  const [postId] = useOutletContext();

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    isError: commentsIsError,
    isSuccess: commentsIsSuccess,
  } = useGetCommentsQuery(postId);

  useEffect(() => {
    if (commentsIsError) {
      notification({
        message: "Couldn't fetch replies",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [commentsIsError, commentsIsSuccess, commentsError, commentsLoading]);

  return (
    <>
      {commentsLoading && <p>Loading...</p>}
      {!commentsLoading && comments.length === 0 && <h4>No replies yet.</h4>}
      {!commentsLoading && comments.length > 0 && (
        <>
          <h4>Replies</h4>
          <PostList posts={comments} />
        </>
      )}
    </>
  );
};

export default Comments;
