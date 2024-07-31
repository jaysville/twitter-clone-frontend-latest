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
import { notification } from "antd";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Post = (props) => {
  const navigate = useNavigate();
  const { post, page, handleMakeComment } = props;
  const { author } = post;
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const [
    toggleLikePost,
    {
      isSuccess: toggleLikeIsSuccess,
      isError: toggleLikeIsError,
      error: toggleLikeError,
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
      if (!post.isComment) {
        navigate("/");
      }
    }
    if (deletePostIsError) {
      notification.error({
        message: deletePostError,
        duration: 1,
        placement: "topRight",
      });
    }
  }, [deletePostError, deletePostIsError, deletePostIsSuccess]);

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
    if (deletePostIsLoading) {
      return;
    }
    e.stopPropagation();
    await deletePost(post._id);
  };
  return (
    <Style onClick={visitPost} page={page}>
      <Details>
        <ProfilePic sx={{ width: 35, height: 35 }} />
        <h5 onClick={visitProfile}>{author.username} </h5>
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

      <ContentBox>{post.content}</ContentBox>
      <ImageContainer>
        <img src={post.images[0]} />
      </ImageContainer>
      <ActionsContainer page={page}>
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
  border-bottom: ${(props) => !props.page && "2px solid #323b42"};
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
    transform: translateY(22px);
    color: gray;
  }
`;

const CrudContainer = styled.div`
  transform: translateY(22px);
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
  transform: translateY(-20px);
`;

const ImageContainer = styled.div`
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
  ${(props) =>
    props.page &&
    `border: 2px solid #323b42;
    border-left: none;
    border-right: none;
  `};
  transform: translateY(10px);

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
