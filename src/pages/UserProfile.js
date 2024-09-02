import styled from "styled-components";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  useFetchUserQuery,
  useToggleFollowUserMutation,
} from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { notification, Spin } from "antd";
import {
  GoBack,
  PostPageBtn,
  ProfileActionButton,
} from "../components/UI/Buttons";
import Avatar from "@mui/material/Avatar";

const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const activeUser = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followsYou, setFollowsYou] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState();

  const {
    data: user,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useFetchUserQuery(userId);

  const [
    toggleFollowUser,
    {
      isSuccess: toggleFollowIsSuccess,
      isError: toggleFollowIsError,
      error: toggleFollowError,
      isLoading: toggleFollowIsLoading,
    },
  ] = useToggleFollowUserMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(user.following, activeUser);
      if (user.followers.includes(activeUser)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }

      if (user.following.includes(activeUser)) {
        setFollowsYou(true);
      } else {
        setFollowsYou(false);
      }
    }
  }, [user, activeUser, isSuccess]);

  useEffect(() => {
    if (toggleFollowIsSuccess) {
      setIsFollowing((prevState) => !prevState);
    }
    if (toggleFollowIsError) {
      console.log(toggleFollowError);
    }
  }, [toggleFollowIsSuccess, toggleFollowIsError, toggleFollowError]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const Links = [
    { link: `/user/${userId}`, tag: "Posts" },
    { link: `/user/${userId}/reposts`, tag: "Reposts" },
    { link: `/user/${userId}/replies`, tag: "Replies" },
    { link: `/user/${userId}/likes`, tag: "Likes" },
  ];

  useEffect(() => {
    if (!isLoading && isError) {
      notification.error({
        message: "Failed to fetch user.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isLoading, isError, error]);

  const handleToggleFollow = () => {
    if (toggleFollowIsLoading) return;
    toggleFollowUser(userId);
  };

  return (
    <Style>
      {isLoading && <p>Loadinggg</p>}
      {!isLoading && isError && <p>user not found</p>}
      {!isLoading && isSuccess && (
        <>
          <GoBack />
          <ProfilePic
            sx={{ width: 130, height: 130 }}
            src={user.profilePic || ""}
          />
          <ProfileBox>
            <span className="displayName">
              {user?.displayName || user?.email}
            </span>
            <span className="username">@{user?.username}</span>
            {followsYou && <FollowsYouTag>Follows You</FollowsYouTag>}
            <ProfileActionButton
              onClick={
                activeUser === userId
                  ? () => {
                      navigate("/edit-profile");
                    }
                  : handleToggleFollow
              }
            >
              {toggleFollowIsLoading ? (
                <Spin />
              ) : activeUser === userId ? (
                "Edit profile"
              ) : (
                `${isFollowing ? "Unfollow" : "Follow"}`
              )}
            </ProfileActionButton>

            {user?.bio && <p>{user.bio} </p>}

            <ul>
              <li
                onClick={() => {
                  navigate(`/user/${userId}/following`);
                }}
              >
                <b>{user?.following.length}</b> Following
              </li>
              <li
                onClick={() => {
                  navigate(`/user/${userId}/followers`);
                }}
              >
                <b>{user?.followers.length}</b> Follower
                {user?.followers.length === 1 ? "" : "s"}
              </li>
            </ul>
          </ProfileBox>

          <LinksTab>
            {Links.map(({ link, tag }, i) => {
              return (
                <Link
                  key={i}
                  isActive={activeLink === link}
                  onClick={() => {
                    navigate(link);
                  }}
                >
                  {tag}
                </Link>
              );
            })}
          </LinksTab>

          <PostPageBtn />
          <Outlet context={[userId]} />
        </>
      )}
    </Style>
  );
};

const LinksTab = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  border-bottom: 1px solid grey;
`;
const ProfilePic = styled(Avatar)`
  transform: translateX(-12px);
`;

const Link = styled.li`
  padding-bottom: 10px;
  cursor: pointer;
  font-size: ${(props) => (props.isActive ? "20px" : "18px")};
  color: grey;
  color: ${(props) => props.isActive && "inherit"};
  border-bottom: ${(props) => props.isActive && "3px solid cornflowerblue"};
`;

const Style = styled.div`
  h4 {
    transform: translateY(-10px);
    color: #536471;
  }
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
`;

const ProfileBox = styled.div`
  position: relative;
  span {
    display: block;
  }
  span.displayName {
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
  }
  span.username {
    color: grey;
  }
  ul {
    display: flex;
  }
  li {
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FollowsYouTag = styled.div`
  width: 60px;
  text-align: center;
  border: 1px solid transparent;
  font-size: 10px;
  background-color: grey;
  padding: 4px;
  border-radius: 5px;
  margin-top: 20px;
`;

export default UserProfile;
