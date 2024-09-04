import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Logout } from "@mui/icons-material";
import { useState } from "react";

export let navLinkData;

const SideNav = (props) => {
  const activeUserId = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const location = useLocation();

  const [currentPath, setCurrentPath] = useState(location.pathname);

  const { notifications } = props;

  const unviewedNotifs = notifications.filter((notif) => !notif.viewed);

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
      title: "Alert",
      link: "/notifications",
      icon: (
        <Badge mobileView={props.isMobileView}>
          {unviewedNotifs.length > 0 && <span>{unviewedNotifs.length}</span>}
          <NotificationsIcon />
        </Badge>
      ),
      onClick: () => {
        setCurrentPath("/notifications");
        navigate("/notifications");
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

  navLinkData = LinkData;
  return (
    <>
      <Style mobileView={props.isMobileView}>
        <SideBarList>
          {LinkData.map(({ title, onClick, link, icon }, i) => {
            return (
              <NavLink
                key={i}
                mobileView={props.isMobileView}
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
  display: ${(props) => props.mobileView && "none"};
  position: fixed;
  left: 0;
  top: 0;
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  span {
    transform: translateX(-6px) translateY(-4px);
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
  height: 50px;
  color: aliceblue;
  position: relative;
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
  span {
    position: relative;
    display: flex;
    justify-content: center;
  }
  svg {
    margin-left: 10px;
  }
`;

const Icon = styled.div`
  flex: 40%;
  display: grid;
  /* place-items: center; */
  font-size: 25px;
`;
const Title = styled.div`
  font-size: 20px;

  flex: 60%;
  text-align: center;
`;

const Badge = styled.div`
  span {
    position: absolute;
    width: 35px;
    height: 35px;
    top: -4px;
    right: 13px;
    border-radius: 35px;
    display: grid;
    place-items: center;
    transform: scale(0.5);
    background-color: #1976d2;
    @media (max-width: 750px) {
      transform: scale(0.6);
      top: 0;
      right: 55px;
    }
  }
`;
