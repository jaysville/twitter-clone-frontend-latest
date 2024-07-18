import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/404";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
// import BottomNav from "./components/Layout/BottomNav";
import SideNav from "./components/Layout/SideNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RequireAuth from "./components/Layout/RequireAuth";
import Posts from "./components/UI/Profile/Posts";
import PostPage from "./pages/Post";
import CreatePost from "./pages/create-post";
import Comments from "./components/UI/Comments";
import Replies from "./components/UI/Profile/Replies";
import Likes from "./components/UI/Profile/Likes";

function App() {
  const token = useSelector((state) => state.auth.token);
  const [showSideNav, setShowSideNav] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (windowWidth >= 900) {
      setShowSideNav(true);
      setIsMobileView(false);
    } else {
      setShowSideNav(false);
      setIsMobileView(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, token]);

  const toggleSideBar = () => {
    setShowSideNav((prevState) => !prevState);
  };

  return (
    <div className="App">
      {showSideNav && token && (
        <SideNav
          isMobileView={isMobileView}
          showSideNav={showSideNav}
          onToggleSideBar={toggleSideBar}
        />
      )}
      {isMobileView && token && (
        <Toggler onClick={toggleSideBar}>
          <CoronavirusIcon />
        </Toggler>
      )}
      <Container showSideNav={showSideNav} token={token}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="" element={<RequireAuth />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:postId" element={<PostPage />}>
              <Route path="" element={<Comments />} />
            </Route>
            <Route path="/user/:userId" element={<UserProfile />}>
              <Route path="" element={<Posts />} />
              <Route path="replies" element={<Replies />} />
              <Route path="likes" element={<Likes />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  padding: 80px 30px;
  @media (min-width: 900px) {
    margin-left: ${(props) => props.showSideNav && props.token && "190px"};
    margin-right: ${(props) => props.showSideNav && props.token && "80px"};
  }
`;

const Toggler = styled.button`
  width: 50px;
  background-color: transparent;
  color: rgb(117, 144, 144);
  border: none;
  cursor: pointer;
  transition: all 170ms ease-in;
  transform: scale(2) translateY(20px);
  position: fixed;
`;