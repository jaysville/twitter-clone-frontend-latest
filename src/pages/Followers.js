import styled from "styled-components";
import { useFetchFollowersQuery } from "../redux/api/userApi";
import UserCard from "../components/UI/UserCard";
import { useParams } from "react-router-dom";
import { GoBack } from "../components/UI/Buttons";

const Followers = () => {
  const params = useParams();

  const { userId } = params;

  const {
    data: followers,
    isLoading,
    isSuccess,
    isError,
  } = useFetchFollowersQuery(userId);

  return (
    <Style>
      <GoBack />
      <h3>Followers</h3>
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
        <p>No followers yet :(</p>
      )}
    </Style>
  );
};

export default Followers;

const Style = styled.div`
  h3 {
    text-align: center;
  }
  p {
    text-align: center;
  }
`;
