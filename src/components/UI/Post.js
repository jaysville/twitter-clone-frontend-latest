import { styled } from "styled-components";
import ReactTimeAgo from "react-time-ago";
import {
  FavoriteBorderOutlined,
  Favorite,
  ChatBubbleOutlineRounded,
  SwapCalls,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useToggleLikePostMutation,
  useToggleRepostMutation,
} from "../../redux/api/postApi";
import { useSelector } from "react-redux";

const Post = (props) => {
  const navigate = useNavigate();
  const { post, page } = props;
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

  const likedByCount = post.likedBy.length;
  const commentCount = post.comments.length;
  const repostCount = post.repostedBy.length;

  useEffect(() => {
    if (post.likedBy.includes(user)) {
      setIsLiked(true);
    }
    if (post.repostedBy.includes(user)) {
      setIsReposted(true);
    }
  }, []);

  useEffect(() => {
    if (toggleLikeIsSuccess) {
      setIsLiked((prevState) => !prevState);
    }
    if (toggleLikeIsError) {
      console.log(toggleLikeError);
    }
  }, [toggleLikeIsSuccess, toggleLikeIsError, toggleLikeError]);

  useEffect(() => {
    if (toggleRepostSuccess) {
      setIsReposted((prevState) => !prevState);
    }
    if (toggleRepostIsError) {
      console.log(toggleRepostError);
    }
  }, [toggleRepostError, toggleRepostIsError, toggleRepostSuccess]);
  const visitProfile = (e) => {
    e.stopPropagation();
    navigate(`/user/${author._id}`);
  };

  const visitPost = () => {
    navigate(`/post/${post._id}`);
  };
  return (
    <Style onClick={visitPost} page={page}>
      <Details>
        <h5 onClick={visitProfile}>{author.username} </h5>
        <h5 onClick={visitProfile}>@{author.username}</h5>

        <small>
          <ReactTimeAgo
            date={post.createdAt}
            locale="en-Us"
            timeStyle="twitter"
          />
        </small>
      </Details>

      <ContentBox>{post.content}</ContentBox>

      <ActionsContainer page={page}>
        <div
          onClick={async (e) => {
            e.stopPropagation();
            if (toggleLikeIsLoading) {
              return;
            }
            await toggleLikePost(post._id);
          }}
        >
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
          <ReplyBtn /> <small>{commentCount}</small>
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
    /* &:hover {
      text-decoration: underline;
    } */
  }
  svg {
    margin-right: 10px;
    font-size: 17px;
  }
`;

const Details = styled.div`
  display: flex;
  small {
    transform: translateY(22px);
    color: gray;
  }
`;

const ContentBox = styled.p`
  transform: translateY(-20px);
`;

const ActionsContainer = styled.div`
  display: flex;
  padding-top: 5px;
  justify-content: space-around;
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
