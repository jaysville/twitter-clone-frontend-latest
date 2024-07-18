import styled from "styled-components";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { useFetchUserQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
import { notification } from "antd";

const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const activeUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState();

  const { data, isLoading, error, isError, isSuccess } =
    useFetchUserQuery(userId);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const Links = [
    { link: `/user/${userId}`, tag: "Posts" },
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
      console.log(error);
    }
  }, [isLoading, isError, error]);

  return (
    <Style>
      {isLoading && <p>Loadinggg</p>}
      {!isLoading && isError && <p>user not found</p>}
      {!isLoading && isSuccess && (
        <>
          <ProfileBox>
            <h3>{data?.username}</h3>
            <h4>{data?.email}</h4>
            <p>
              {data?.bio
                ? data.bio
                : "Testing biiiiioo, ido not give any fuck fr"}
            </p>
            <ul>
              <li>
                <b>{data?.following.length}</b> Following
              </li>
              <li>
                <b>{data?.followers.length}</b> Follower
                {data?.followers.length === 1 ? "" : "s"}
              </li>
            </ul>
            {activeUser === userId && <p>Edit Profile</p>}
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
          {/* <hr /> */}
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
  ul {
    display: flex;
  }
  li {
    margin-right: 10px;
  }
`;

export default UserProfile;
