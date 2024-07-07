import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { Close, Logout } from "@mui/icons-material";

const SideNav = (props) => {
  const activeUserId = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Style onClick={props.onToggleSideBar}>
        {/* {props.isMobileView && (
          <CloseBtn onClick={props.onToggleSideBar}>
            <Close />
          </CloseBtn>
        )} */}
        <SideBarList>
          <Link style={{ textDecoration: "none" }} to="/">
            <NavLink>
              <Title>Home</Title>
              <Icon>
                <HomeIcon />
              </Icon>
            </NavLink>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/search">
            <NavLink>
              <Title>Search</Title>
              <Icon>
                <SearchIcon />
              </Icon>
            </NavLink>
          </Link>
          <Link style={{ textDecoration: "none" }} to={`/user/${activeUserId}`}>
            <NavLink>
              <Title>Profile</Title>
              <Icon>
                <PersonIcon />
              </Icon>
            </NavLink>
          </Link>
          {token && (
            <NavLink
              onClick={() => {
                dispatch(logout());
              }}
            >
              <Title>Logout</Title>
              <Icon>
                <Logout />
              </Icon>
            </NavLink>
          )}
        </SideBarList>
      </Style>
    </>
  );
};

export default SideNav;

const Style = styled.div`
  background-color: #15202b;
  padding: 10px;
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
