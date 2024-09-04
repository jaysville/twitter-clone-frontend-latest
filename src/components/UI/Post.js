import { styled } from "styled-components";
import ReactTimeAgo from "react-time-ago";
import {
  FavoriteBorderOutlined,
  Favorite,
  ChatBubbleOutlineRounded,
  SwapCalls,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useToggleLikePostMutation,
  useToggleRepostMutation,
  useDeletePostMutation,
} from "../../redux/api/postApi";
import { notification, Carousel, Modal } from "antd";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Post = (props) => {
  const navigate = useNavigate();
  const { post, handleMakeComment } = props;
  const { author } = post;
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    setIsModalOpen(false);

    await deletePost(post._id);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const [
    toggleLikePost,
    {
      isSuccess: toggleLikeIsSuccess,

      isLoading: toggleLikeIsLoading,
    },
  ] = useToggleLikePostMutation();

  const [
    toggleRepost,
    {
      isSuccess: toggleRepostSuccess,
      isError: toggleRepostIsError,
      error: toggleRepostError,
      isLoading: toggleRepostIsLoading,
    },
  ] = useToggleRepostMutation();

  const [
    deletePost,
    {
      isLoading: deletePostIsLoading,
      error: deletePostError,
      isError: deletePostIsError,
      isSuccess: deletePostIsSuccess,
    },
  ] = useDeletePostMutation();

  const likedByCount = post.likedBy.length;
  const commentCount = post.comments.length;
  const repostCount = post.repostedBy.length;

  useEffect(() => {
    if (post.likedBy.includes(user)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    if (post.repostedBy.includes(user)) {
      setIsReposted(true);
    } else {
      setIsReposted(false);
    }
  }, [post, user, isLiked]);

  useEffect(() => {
    if (toggleLikeIsSuccess) {
      setIsLiked((prevState) => !prevState);
    }
  }, [toggleLikeIsSuccess]);

  useEffect(() => {
    if (toggleRepostSuccess) {
      setIsReposted((prevState) => !prevState);
    }
  }, [toggleRepostError, toggleRepostIsError, toggleRepostSuccess]);

  useEffect(() => {
    if (deletePostIsSuccess) {
      notification.success({
        message: "Post deleted",
        duration: 1,
        placement: "topRight",
      });
      navigate("/");
    }
    if (deletePostIsError) {
      notification.error({
        message: deletePostError,
        duration: 1,
        placement: "topRight",
      });
    }
  }, [deletePostError, deletePostIsError, deletePostIsSuccess, navigate]);

  const visitProfile = (e) => {
    e.stopPropagation();
    navigate(`/user/${author._id}`);
  };

  const visitPost = () => {
    navigate(`/post/${post._id}`);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();

    if (toggleLikeIsLoading) {
      return;
    }
    toggleLikePost(post._id);
  };

  const handleDeletePost = async (e) => {
    e.stopPropagation();
    if (deletePostIsLoading) {
      return;
    }
    setIsModalOpen(true);
  };
  return (
    <Style onClick={visitPost}>
      <Modal
        title="Delete Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Are you sure you want to delete post ?
      </Modal>
      <Details>
        <ProfilePic
          sx={{ width: 35, height: 35 }}
          src={author.profilePic || ""}
        />
        <h5 onClick={visitProfile}>{author.displayName || author.username} </h5>
        <h5 onClick={visitProfile}>@{author.username}</h5>

        <small>
          <ReactTimeAgo
            date={post.createdAt}
            locale="en-Us"
            timeStyle="twitter"
          />
        </small>

        {author._id === user && (
          <CrudContainer>
            <Edit
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/post/${post._id}/edit`);
              }}
            />
            <Delete onClick={handleDeletePost} />
          </CrudContainer>
        )}
      </Details>

      {post.content && <ContentBox>{post.content}</ContentBox>}
      {post.images.length > 0 && (
        <ImageContainer>
          <Carousel arrows autoplay>
            {post.images.map((url, i) => {
              return <img src={url} alt="post" key={i} />;
            })}
          </Carousel>
        </ImageContainer>
      )}
      <ActionsContainer>
        <div onClick={handleToggleLike}>
          {isLiked ? (
            <Favorite style={{ fill: "red" }} />
          ) : (
            <>
              <NotLikedButton disabled={toggleLikeIsLoading} />
            </>
          )}
          <small
            style={{
              color: isLiked && "red",
            }}
          >
            {likedByCount}
          </small>
        </div>
        <div>
          <ReplyBtn onClick={handleMakeComment} /> <small>{commentCount}</small>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (toggleRepostIsLoading) {
              return;
            }
            toggleRepost(post._id);
          }}
        >
          <RepostBtn
            style={{
              fill: isReposted && "green",
            }}
          />
          <small
            style={{
              color: isReposted && "green",
            }}
          >
            {repostCount}
          </small>
        </div>
      </ActionsContainer>
    </Style>
  );
};

const Style = styled.div`
  min-height: 170px;
  padding: 5px;
  cursor: pointer;
  h5 {
    display: inline;
    margin-right: 2px;
    cursor: pointer;
  }
`;

const Details = styled.div`
  display: flex;
  small {
    transform: translateY(19px);
    color: gray;
  }
`;

const CrudContainer = styled.div`
  transform: translateY(15px);
  margin-left: auto;
  svg {
    margin-right: 10px;
    font-size: 17px;
    margin: 0 10px;
  }
`;

const ProfilePic = styled(Avatar)`
  transform: translateY(10px) translateX(-5px);
`;

const ContentBox = styled.p`
  transform: translateY(-7px);
`;

const ImageContainer = styled.div`
  margin-bottom: 10px;
  img {
    width: 100%;
    border-radius: 5px;
    border: 1px solid gray;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  padding-top: 5px;
  justify-content: space-between;
  border: 2px solid #323b42;
  border-left: none;
  border-right: none;
  margin-bottom: 10px;
  div {
    margin: 10px;
  }
  svg {
    margin-right: 10px;
    font-size: 17px;

    transform: translateY(5px);
  }
`;

const NotLikedButton = styled(FavoriteBorderOutlined)`
  &:hover {
    fill: red;
  }
`;

const ReplyBtn = styled(ChatBubbleOutlineRounded)`
  &:hover {
    fill: cornflowerblue;
  }
`;

const RepostBtn = styled(SwapCalls)`
  &:hover {
    fill: green;
  }
`;

export default Post;
