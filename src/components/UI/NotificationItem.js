import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import styled from "styled-components";

const NotificationItem = ({ notification }) => {
  const { activeUser, message, viewed, associatedPost } = notification;
  const { profilePic } = activeUser;

  const navigate = useNavigate();
  return (
    <Style
      onClick={() => {
        navigate(
          associatedPost
            ? `/post/${associatedPost.toString()}`
            : `/user/${activeUser._id.toString()}`
        );
      }}
      viewed={viewed}
    >
      <ProfilePic
        src={profilePic || ""}
        sx={{ width: 35, height: 35 }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/user/${activeUser._id.toString()}`);
        }}
      />
      <span>{message}</span>
      <span className="time">
        <ReactTimeAgo
          date={notification.createdAt}
          locale="en-Us"
          timeStyle="twitter"
        />
      </span>
    </Style>
  );
};

export default NotificationItem;

const Style = styled.div`
  background-color: ${(props) => !props.viewed && "cornflowerblue"};
  height: 50px;
  border-bottom: 1px solid grey;
  display: flex;
  margin-top: 30px;
  cursor: pointer;
  span {
    margin-left: 10px;
    margin-top: 10px;
  }
  span.time {
    margin-left: auto;
  }
`;

const ProfilePic = styled(Avatar)``;
