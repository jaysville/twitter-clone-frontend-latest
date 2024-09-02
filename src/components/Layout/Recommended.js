import { useSelector } from "react-redux";
import styled from "styled-components";
import { useFetchRecommendedUsersQuery } from "../../redux/api/userApi";
import { useEffect } from "react";
import UserCard from "../UI/UserCard";

const Recommended = (props) => {
  const activeUserId = useSelector((state) => state.auth.user);

  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useFetchRecommendedUsersQuery();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);

  return (
    <Style>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something Went wrong</p>
      ) : (
        isSuccess && (
          <>
            {/* <h3>Accounts to follow</h3> */}
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

  @media (max-width: 1000px) {
    display: none;
  }
`;
