import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "@mui/icons-material";
import { useState } from "react";

const SideNav = (props) => {
  const activeUserId = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const location = useLocation();

  const [currentPath, setCurrentPath] = useState(location.pathname);

  const LinkData = [
    {
      title: "Home",
      link: "/",
      icon: <HomeIcon />,
      onClick: () => {
        setCurrentPath("/");
        navigate("/");
      },
    },
    {
      title: "Search",
      link: "/search",
      icon: <SearchIcon />,
      onClick: () => {
        setCurrentPath("/search");
        navigate("/search");
      },
    },
    {
      title: "Profile",
      link: `/user/${activeUserId}`,
      icon: <PersonIcon />,
      onClick: () => {
        setCurrentPath(`/user/${activeUserId}`);
        navigate(`/user/${activeUserId}`);
      },
    },
    {
      title: "Logout",
      icon: <Logout />,
      onClick: () => {
        props.openLogoutModal();
      },
    },
  ];
  return (
    <>
      <Style
        onClick={() => {
          if (props.isMobileView) {
            props.onToggleSideBar();
          }
        }}
      >
        <SideBarList>
          {LinkData.map(({ title, onClick, link, icon }, i) => {
            return (
              <NavLink
                key={i}
                onClick={onClick}
                isActive={currentPath === link}
              >
                <Title>{title}</Title>
                <Icon>{icon}</Icon>
              </NavLink>
            );
          })}
        </SideBarList>
      </Style>
    </>
  );
};

export default SideNav;

const Style = styled.div`
  background-color: #0b0201;
  border-right: 1px solid aliceblue;
  padding: 10px 0;
  width: 150px;
  height: 100vh;
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
`;

const SideBarList = styled.ul`
  height: auto;
  width: 100%;
  padding: 0;
  margin-top: 10vh;
  a {
    text-decoration: none;
  }
`;

const NavLink = styled.li`
  width: 100%;
  height: 60px;
  color: aliceblue;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  margin-bottom: 30px;
  transition: all 300ms ease-in-out;
  background-color: ${(props) => props.isActive && "cornflowerblue"};
  &:hover,
  &:active {
    background-color: cornflowerblue;
  }
`;

const Icon = styled.div`
  flex: 30%;
  display: grid;
  /* place-items: center; */
  font-size: 25px;
`;
const Title = styled.div`
  font-size: 20px;

  flex: 70%;
  text-align: center;
`;

// const CloseBtn = styled.button`position: absolute`;
