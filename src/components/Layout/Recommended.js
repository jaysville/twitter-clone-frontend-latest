import styled from "styled-components";
import { useFetchRecommendedUsersQuery } from "../../redux/api/userApi";
import UserCard from "../UI/UserCard";

const Recommended = (props) => {
  const {
    data: users,
    isLoading,
    isError,

    isSuccess,
  } = useFetchRecommendedUsersQuery();

  return (
    <Style>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something Went wrong</p>
      ) : (
        isSuccess && (
          <>
            <h3>Accounts to follow</h3>
            <ul>
              {users.map((user, i) => {
                return (
                  <li key={i}>
                    <UserCard user={user} />
                  </li>
                );
              })}
            </ul>
          </>
        )
      )}
    </Style>
  );
};

export default Recommended;

const Style = styled.div`
  display: flex;
  position: relative;
  background-color: #0b0201;
  border-left: 1px solid aliceblue;
  padding: 10px 0;
  width: 300px;
  overflow-y: scroll;
  height: 100vh;
  z-index: 1;
  position: fixed;
  right: 0;
  top: 0;
  ul {
    margin-top: 80px;
  }

  @media (max-width: 1000px) {
    display: none;
  }
  h3 {
    position: absolute;
    top: 30px;
    right: 100px;
  }
`;
