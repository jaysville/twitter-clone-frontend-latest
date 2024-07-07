import styled from "styled-components";
import PostAddIcon from "@mui/icons-material/PostAdd";

export const AuthButton = styled.button`
  margin-top: 50px;
  padding: 15px;
  border-radius: 10px;
  font-size: 17px;
  background-color: ${(props) =>
    props.isLoading ? "#cad6eb" : "cornflowerblue"};
  color: aliceblue;
  border: none;
  min-width: 85px;

  transition: all 1ms ease-in-out;
  @media (max-width: 440px) {
    width: 100%;
  }
  &:hover {
    color: cornflowerblue;
    background-color: #cad6eb;
  }
`;

export const PostBtn = (props) => {
  const Style = styled.button`
    border-radius: 10px;
    color: aliceblue;
    background-color: skyblue;
    border: none;
    position: fixed;
    transform: scale(1.5);
    right: 20px;
    bottom: 20px;
    cursor: pointer;
  `;
  return (
    <Style onClick={props.onclick}>
      <PostAddIcon />
    </Style>
  );
};
