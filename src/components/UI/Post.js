import { styled } from "styled-components";
import ReactTimeAgo from "react-time-ago";
import {
  FavoriteBorderOutlined,
  Favorite,
  ChatBubbleOutlineRounded,
  SwapCalls,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Post = (props) => {
  const navigate = useNavigate();
  const { post } = props;
  const { author } = post;

  const likedByCount = post.likedBy.length;
  const commentCount = post.comments.length;
  const repostCount = post.repostedBy.length;

  const visitProfile = () => {
    navigate(`/user/${author._id}`);
  };

  const visitPost = () => {
    navigate(`/post/${post._id}`);
  };
  return (
    <Style>
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

      {/* <Link to={`/post/${post._id}`}> */}
      <ContentBox>{post.content}</ContentBox>
      {/* </Link> */}

      <ActionsContainer>
        <div>
          <FavoriteBorderOutlined /> <small>{likedByCount}</small>
        </div>
        <div>
          <ChatBubbleOutlineRounded /> <small>{commentCount}</small>
        </div>
        <div>
          <SwapCalls /> <small>{repostCount}</small>
        </div>
      </ActionsContainer>
    </Style>
  );
};

const Style = styled.div`
  min-height: 170px;
  padding: 10px;
  border: 1px solid #323b42;
  cursor: pointer;
  h5 {
    display: inline;
    margin-right: 2px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
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
  div {
    margin: 10px;
  }
  svg {
    transform: translateY(5px);
    margin-right: 0px;
  }
`;

export default Post;
