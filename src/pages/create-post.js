import styled from "styled-components";
import { notification, Spin } from "antd";

import { useEffect, useState } from "react";
import { useCreatePostMutation } from "../redux/api/postApi";
import { useNavigate } from "react-router-dom";
import { GoBack, PostUploadButton } from "../components/UI/Buttons";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState(null);
  const [createPost, { isLoading, error, isError, isSuccess }] =
    useCreatePostMutation();
  const navigate = useNavigate();

  const submitPost = (e) => {
    e.preventDefault();
    if (!images && content.length === 0) {
      notification.error({
        message: "Post cannot be empty",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    } else if (!images && content.length <= 2) {
      notification.error({
        message: "Text should contain at least 2 characters",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }
    createPost({ content, images });
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
      console.log(error);
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
      <GoBack />
      <h2>Create Post</h2>
      <form>
        <textarea
          placeholder="Whats on your mind?"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <input
          type="file"
          multiple
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files);
            const uniqueFiles = selectedFiles.filter(
              (file, index, self) =>
                index === self.findIndex((f) => f.name === file.name)
            );

            setImages(uniqueFiles);
          }}
        />
        <PostUploadButton
          type="submit"
          onClick={submitPost}
          disabled={isLoading}
        >
          {isLoading ? <Spin /> : " Post"}
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

export default CreatePost;
