import styled from "styled-components";

import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  useCommentOnPostMutation,
  useGetSinglePostQuery,
} from "../redux/api/postApi";
import Post from "../components/UI/Post";

import { notification, Spin } from "antd";

import {
  GoBack,
  PostPageBtn,
  PostUploadButton,
} from "../components/UI/Buttons";

const PostPage = () => {
  
  const params = useParams();

  const { postId } = params;

  const navigate = useNavigate();

  const [replyContent, setReplyContent] = useState("");

  const [makeComment, setMakeComment] = useState(false);

  const commentRef = useRef();

  useEffect(() => {
    if (makeComment) {
      commentRef.current.focus();
    }
  }, [makeComment]);

  const { data, isLoading, isError, isSuccess } = useGetSinglePostQuery(postId);

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
          <GoBack />
          <h2>
            {data.isComment ? (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/post/${data.replyingTo.repliedPostId}`);
                }}
              >{`Replying to ${data.replyingTo.repliedPostAuthor}`}</span>
            ) : (
              "Post"
            )}
          </h2>
          <hr />
          <Post
            post={data}
            page={"true"}
            handleMakeComment={() => {
              setMakeComment(true);
            }}
          />
          <form>
            <textarea
              placeholder="Reply"
              value={replyContent}
              ref={commentRef}
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
          <PostPageBtn />
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
    margin-top: 50px;
    min-height: 100px;
    background-color: transparent;
    outline: none;
    border: none;
    color: aliceblue;
  }
`;
export default PostPage;
