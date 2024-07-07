import styled from "styled-components";
import { message, notification } from "antd";

import { useEffect, useState } from "react";
import { useCreatePostMutation } from "../redux/api/postApi";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [post, setPosts] = useState("");
  const [createPost, { isLoading, error, data, isError, isSuccess }] =
    useCreatePostMutation();
  const navigate = useNavigate();

  const submitPost = async () => {
    console.log(post.length);
    if (post.length < 3) {
      notification.error({
        message: "Post should contain at least 3 characters",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }
    console.log("passed custom validator");
    await createPost({ content: post });
  };

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Post Created",
        duration: 3,
        placement: "topRight",
      });
      navigate("/");
    }
    if (isError) {
      console.log(error, "error here");
      notification.error({
        message:
          error.status === 500 ? "Something went wrong." : error.data.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isSuccess, isError, error, isLoading]);
  return (
    <Style>
      <textarea
        onChange={(e) => {
          setPosts(e.target.value);
        }}
      />
      <button onClick={submitPost}>Post</button>
    </Style>
  );
};

const Style = styled.div``;

export default CreatePost;
