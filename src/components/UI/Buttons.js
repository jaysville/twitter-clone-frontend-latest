import styled from "styled-components";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

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

export const PostPageBtn = (props) => {
  const navigate = useNavigate();

  const Style = styled.button`
    border-radius: 10px;
    color: aliceblue;
    background-color: skyblue;
    border: none;
    position: fixed;
    transform: scale(1.5);
    right: 20px;
    bottom: 20px;
    z-index: 2000000000000000;

    cursor: pointer;
  `;

  return (
    <Style
      onClick={() => {
        navigate("/create-post");
      }}
    >
      <PostAddIcon />
    </Style>
  );
};
export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <ArrowBack
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(-1);
      }}
    />
  );
};

export const PostUploadButton = styled.button`
  color: aliceblue;
  align-self: flex-end;
  cursor: pointer;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => (props.disabled ? "grey" : "cornflowerblue")};
  @media (max-width: 500px) {
    transform: scale(0.8);
    margin-top: 50px;
  }
`;

export const ProfileActionButton = styled.button`
  position: absolute;
  top: -10px;
  right: 0;
  background-color: transparent;
  border: 1px solid grey;
  color: aliceblue;
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  svg {
    transform: scale(0.8);
  }
`;
