import styled from "styled-components";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  useFetchUserQuery,
  useToggleFollowUserMutation,
} from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
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

  // const userFollowing = user.followers.includes(activeUser);

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
      if (user.followers.includes(activeUser)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
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
          <Avatar sx={{ width: 130, height: 130 }} />
          <ProfileBox>
            <h3>{user?.username}</h3>
            <h4>{user?.email}</h4>

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

            <p>
              {user?.bio
                ? user.bio
                : "Testing biiiiioo, ido not give any fuck fr"}
            </p>
            <ul>
              <li>
                <b>{user?.following.length}</b> Following
              </li>
              <li>
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
  ul {
    display: flex;
  }
  li {
    margin-right: 10px;
  }
`;

const FollowsYouTag = styled.div``;

export default UserProfile;
