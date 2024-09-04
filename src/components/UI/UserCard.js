import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useToggleFollowUserMutation } from "../../redux/api/userApi";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const activeUserId = useSelector((state) => state.auth.user);

  const [toggleFollowUser, { isSuccess, isLoading }] =
    useToggleFollowUserMutation();

  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user.followers.includes(activeUserId)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user, activeUserId]);

  useEffect(() => {
    if (isSuccess) {
      setIsFollowing((prevState) => !prevState);
    }
  }, [isSuccess]);

  const handleToggleFollow = () => {
    if (isLoading) return;
    toggleFollowUser(user._id);
  };
  return (
    <Style>
      <ProfilePic sx={{ width: 35, height: 35 }} src={user.profilePic || ""} />
      <div
        onClick={() => {
          navigate(`/user/${user._id}`);
        }}
      >
        <span className="displayName">{user.displayName || user.username}</span>
        <span className="username">@{user.username}</span>
      </div>
      {activeUserId !== user._id && (
        <ToggleFollowButton onClick={handleToggleFollow}>
          {isLoading ? <Spin /> : isFollowing ? "Unfollow" : "Follow"}
        </ToggleFollowButton>
      )}
    </Style>
  );
};

export default UserCard;

const Style = styled.div`
  transform: scale(0.9);
  display: flex;
  margin-bottom: 10px;
  span {
    cursor: pointer;
    margin-left: 10px;
  }
  div {
    display: flex;
    flex-direction: column;

    span.displayName {
      font-size: 15px;
      font-weight: bold;
    }
    span.username {
      color: grey;
    }
  }
`;

const ToggleFollowButton = styled.button`
  background-color: transparent;
  border: 1px solid grey;
  color: aliceblue;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  outline: none;
  font-size: 14px;
  transform: scale(0.7) translate(50px);
  margin-left: auto;
  font-weight: bold;
`;

const ProfilePic = styled(Avatar)`
  transform: translateY(7px);
`;
