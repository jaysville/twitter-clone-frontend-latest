import styled from "styled-components";

const AuthForm = (props) => {
  return <Style onSubmit={props.onSubmit}>{props.children}</Style>;
};

const Style = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 790px) {
    width: 90%;
  }
  input {
    width: 100%;
    color: #bfd2ff;
    line-height: 2.2rem;
    font-size: 15px;
    vertical-align: middle;
    &::-webkit-input-placeholder {
      color: #7881a1;
    }
    background-color: transparent;
    outline: none;
    border: none;
  }
`;

export const InputContainer = styled.div`
  div {
    display: flex;
  }
  @keyframes gradient {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  border-radius: 2px;
  padding: 1.3rem 1.2rem;
  @media (max-width: 790px) {
    padding: 1rem;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(
      to right,
      #b294ff,
      #57e6e6,
      #feffb8,
      #57e6e6,
      #b294ff,
      #57e6e6
    );
    background-size: 500% auto;
    animation: gradient 3s linear infinite;
  }
`;

export default AuthForm;
