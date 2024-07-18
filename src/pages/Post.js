import styled from "styled-components";

import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useCommentOnPostMutation,
  useGetSinglePostQuery,
} from "../redux/api/postApi";
import Post from "../components/UI/Post";
import { notification, Spin } from "antd";
import { PostUploadButton } from "../components/UI/Buttons";

const PostPage = () => {
  const params = useParams();

  const { postId } = params;

  const [replyContent, setReplyContent] = useState("");

  const { data, isLoading, error, isError, isSuccess } =
    useGetSinglePostQuery(postId);

  const [
    commentOnPost,
    {
      isLoading: replyLoading,
      error: replyError,
      isSuccess: replyIsSuccess,
      isError: replyIsError,
    },
  ] = useCommentOnPostMutation();

  const handleCommentOnPost = async (e) => {
    e.preventDefault();
    if (replyContent.length < 3) return;
    await commentOnPost({ content: replyContent, postId });
  };

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Something went wrong :(",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (replyIsError) {
      notification.error({
        message: "Something went wrong :(",
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (replyIsSuccess) {
      setReplyContent("");
      notification.success({
        message: "Reply sent",
        duration: 3,
        placement: "topRight",
      });
    }
  }, [replyIsSuccess, replyIsError, replyError]);

  return (
    <Style>
      {isLoading && <p>Loading...</p>}
      {!isLoading && isSuccess && (
        <>
          <h2>
            {data.isComment ? (
              <>{`Replying to ${data.replyingTo.repliedPostAuthor}`}</>
            ) : (
              "Post"
            )}
          </h2>
          <hr />
          <Post post={data} page={"true"} />
          <form>
            <textarea
              placeholder="Reply"
              value={replyContent}
              onChange={(e) => {
                setReplyContent(e.target.value);
              }}
            />
            <PostUploadButton
              disabled={replyLoading || replyContent.length < 3}
              onClick={handleCommentOnPost}
            >
              {replyLoading ? <Spin /> : "Reply"}
            </PostUploadButton>
          </form>

          <Outlet context={[postId]} />
        </>
      )}
    </Style>
  );
};

const Style = styled.div`
  form {
    display: flex;
  }
  textarea {
    width: 100%;
    height: 100px;
    background-color: transparent;
    outline: none;
    border: none;
    color: aliceblue;
  }
`;
export default PostPage;
