import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
// import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
// import PersonIcon from "@mui/icons-material/Person";
// import { Logout } from "@mui/icons-material";
// import { useState } from "react";

const Recommended = (props) => {
  const activeUserId = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return <Style> Follow these accounts innit</Style>;
};

export default Recommended;

const Style = styled.div`
  background-color: #0b0201;
  border-left: 1px solid aliceblue;
  padding: 10px 0;
  width: 300px;
  height: 100vh;
  z-index: -1;
  position: fixed;
  right: 0;
  top: 0;
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;
