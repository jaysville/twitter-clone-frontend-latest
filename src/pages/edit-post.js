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
  const { data, isError, isSuccess, error } = useGetSinglePostQuery(postId);
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
  const [postImages, setPostImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setPost(data.content);
      setPostImages(data.images);
    }
    if (isError) {
      notification.error({
        message: error.data.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isSuccess, isError, error]);

  const handleEditPost = () => {
    if (
      post === data.content &&
      imagesToDelete.length === 0 &&
      newImages.length === 0
    ) {
      notification.error({
        message: "No changes made.",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }
    editPost({
      content: post,
      postId,
      newImages,
      imagesToDelete: imagesToDelete.map((img, i) => {
        return img.url;
      }),
    });
  };

  const handleCheckboxChange = (index, url) => {
    setImagesToDelete((prevImagesToDelete) => {
      const image = { index, url };
      const isSelected = prevImagesToDelete.some((img) => img.index === index);
      if (isSelected) {
        return prevImagesToDelete.filter((img) => img.index !== index);
      } else {
        return [...prevImagesToDelete, image];
      }
    });
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
        message: editPostError.data.error,
        duration: 3,
        placement: "top",
      });
    }
  }, [editPostIsSuccess, editPostIsError, editPostError, error]);

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

        {data?.isComment === false && (
          <input
            type="file"
            multiple
            onChange={(e) => {
              setNewImages(e.target.files);
            }}
          />
        )}
        <PostUploadButton
          onClick={(e) => {
            e.preventDefault();
            handleEditPost();
          }}
          disabled={editPostIsLoading}
        >
          {editPostIsLoading ? <Spin /> : "Save"}
        </PostUploadButton>
        {postImages.length > 0 && (
          <>
            <small>The selected images will be deleted on save</small>
            <PostImgsContainer>
              {postImages.map((img, i) => {
                return (
                  <ImgContainer key={i}>
                    <img src={img} alt={`${img - i}`} />
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleCheckboxChange(i, img);
                      }}
                    />
                  </ImgContainer>
                );
              })}
            </PostImgsContainer>
          </>
        )}
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

const PostImgsContainer = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const ImgContainer = styled.div`
  position: relative;
  width: 150px;
  img {
    width: 100%;
  }
  svg {
    position: absolute;
    top: -3px;
    right: 15px;
    transform: scale(0.8);
    fill: black;
  }
  input {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default EditPost;
