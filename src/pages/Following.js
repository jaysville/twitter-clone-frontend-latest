import styled from "styled-components";
import { useFetchFollowingQuery } from "../redux/api/userApi";
import UserCard from "../components/UI/UserCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { GoBack } from "../components/UI/Buttons";

const Following = () => {
  const params = useParams();

  const { userId } = params;

  const {
    data: followers,
    isLoading,
    isSuccess,
    isError,
  } = useFetchFollowingQuery(userId);

  return (
    <Style>
      <GoBack />
      <h3>Following</h3>
      {isLoading && <p>Loading</p>}
      {isError && <p>Something went wrong</p>}
      {isSuccess && followers.length > 0 ? (
        <ul>
          {followers.map((user, i) => {
            return (
              <li key={i}>
                <UserCard user={user} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Not following anyone :(</p>
      )}
    </Style>
  );
};

export default Following;

const Style = styled.div`
  h3 {
    text-align: center;
  }
  p {
    text-align: center;
  }
`;
