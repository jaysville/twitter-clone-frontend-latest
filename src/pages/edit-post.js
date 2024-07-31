import styled from "styled-components";
import { message, notification, Spin } from "antd";

import { useEffect, useState } from "react";
import {
  useEditPostMutation,
  useGetSinglePostQuery,
} from "../redux/api/postApi";
import { useNavigate, useParams } from "react-router-dom";
import { GoBack, PostUploadButton } from "../components/UI/Buttons";

const EditPost = () => {
  const params = useParams();
  const { postId } = params;
  const navigate = useNavigate();
  const { data, isError, isSuccess } = useGetSinglePostQuery(postId);
  const [
    editPost,
    {
      isLoading: editPostIsLoading,
      error: editPostError,
      isSuccess: editPostIsSuccess,
      isError: editPostIsError,
    },
  ] = useEditPostMutation();

  const [post, setPost] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setPost(data.content);
    }
    if (isError) {
      notification.error({
        message: "Something went wrong :(",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isSuccess, isError]);

  const handleEditPost = () => {
    if (post === data.content) {
      notification.error({
        message: "No changes made.",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }
    editPost({ content: post, postId });
  };

  useEffect(() => {
    if (editPostIsSuccess) {
      notification.success({
        message: "Edited",
        duration: 3,
        placement: "topRight",
      });
      navigate(`/post/${[postId]}`);
    }
    if (editPostIsError) {
      console.log(editPostError);
      notification.error({
        message: "Something went wrong.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [editPostIsSuccess, editPostIsError, editPostError]);
  return (
    <Style>
      <GoBack />
      <h3>Edit Post</h3>
      <form>
        <textarea
          value={post}
          placeholder="Edit post"
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />

        <PostUploadButton
          onClick={(e) => {
            e.preventDefault();
            handleEditPost();
          }}
          disabled={editPostIsLoading || post.trim().length < 3}
        >
          {editPostIsLoading ? <Spin /> : " Edit"}
        </PostUploadButton>
      </form>
    </Style>
  );
};

const Style = styled.div`
  svg {
    cursor: pointer;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  textarea {
    width: 100%;
    min-height: 100px;
    background-color: transparent;
    outline: none;
    border: none;
    color: aliceblue;
  }
`;

export default EditPost;
