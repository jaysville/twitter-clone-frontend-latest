import styled from "styled-components";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { useFetchUserQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { notification } from "antd";

const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const activeUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { data, isLoading, error, isError, isSuccess } =
    useFetchUserQuery(userId);

  const Links = [
    { link: `http://localhost:3000/user/${userId}`, tag: "Posts" },
    { link: `http://localhost:3000/user/${userId}/likes`, tag: "Likes" },
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
  }, [data, isLoading, isError, error]);

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

          <ul>
            {Links.map(({ link, tag }, i) => {
              return (
                <li key={i}>
                  <Link to={link}>{tag}</Link>
                </li>
              );
            })}
          </ul>
          <hr />
          <Outlet context={[userId]} />
        </>
      )}
    </Style>
  );
};

const TabLink = styled.li``;

const Style = styled.div`
  h4 {
    transform: translateY(-10px);
    color: #536471;
  }
`;

const ProfileBox = styled.div`
  ul {
    display: flex;
    list-style-type: none;
    padding-inline-start: 0;
  }
  li {
    margin-right: 10px;
  }
`;

export default UserProfile;
