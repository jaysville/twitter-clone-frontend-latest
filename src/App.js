import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/404";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import SideNav, { navLinkData } from "./components/Layout/SideNav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequireAuth from "./components/Layout/RequireAuth";
import Posts from "./components/UI/Profile/Posts";
import PostPage from "./pages/Post";
import CreatePost from "./pages/create-post";
import Comments from "./components/UI/Comments";
import Replies from "./components/UI/Profile/Replies";
import Likes from "./components/UI/Profile/Likes";
import Reposts from "./components/UI/Profile/Reposts";
import EditPost from "./pages/edit-post";
import Recommended from "./components/Layout/Recommended";
import EditProfile from "./pages/edit-profile";
import { Modal } from "antd";
import { logout } from "./redux/slices/authSlice";
import Followers from "./pages/Followers";
import Following from "./pages/Following";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Notifications from "./pages/Notifications";
import { useFetchNotificationsQuery } from "./redux/api/userApi";

function App() {
  const token = useSelector((state) => state.auth.token);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const { data, isSuccess, refetch } = useFetchNotificationsQuery();

  const dispatch = useDispatch();

  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logout());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
    refetch();
  }, [location.pathname, refetch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (windowWidth >= 750) {
      setIsMobileView(false);
    } else {
      setIsMobileView(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, token]);

  useEffect(() => {
    if (isSuccess) {
      setNotifications(data?.userNotifications);
    }
  }, [isSuccess, data]);

  const [value, setValue] = useState("Home");

  useEffect(() => {
    setValue(0);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      {token && (
        <SideNav
          isMobileView={isMobileView}
          openLogoutModal={openLogoutModal}
          notifications={notifications}
        />
      )}

      <Modal
        title="Confirm Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Are you sure you want to Logout?
      </Modal>
      <Container
        token={token}
        currentPath={currentPath}
        isMobileView={isMobileView}
      >
        <Routes>
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!token ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="" element={<RequireAuth />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />

            <Route path="/post/:postId" element={<PostPage />}>
              <Route path="" element={<Comments />} />
            </Route>
            <Route path="/post/:postId/edit" element={<EditPost />} />
            <Route path="/user/:userId" element={<UserProfile />}>
              <Route path="" element={<Posts />} />
              <Route path="reposts" element={<Reposts />} />
              <Route path="replies" element={<Replies />} />
              <Route path="likes" element={<Likes />} />
            </Route>
            <Route path="/user/:userId/followers" element={<Followers />} />
            <Route path="/user/:userId/following" element={<Following />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route
              path="/notifications"
              element={<Notifications notifications={notifications} />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        {token && currentPath !== "/edit-profile" && <Recommended />}
      </Container>
      {isMobileView && token && (
        <Box>
          <BottomNavigation
            sx={{ backgroundColor: "black" }}
            value={value}
            onChange={handleChange}
          >
            {navLinkData.map((link, i) => {
              return (
                <BottomNavigationAction
                  label={link.title}
                  key={i}
                  icon={link.icon}
                  onClick={link.onClick}
                  sx={{ color: "aliceblue" }}
                />
              );
            })}
          </BottomNavigation>
        </Box>
      )}
    </div>
  );
}

export default App;

const Container = styled.div`
  padding: ${(props) => (props.isMobileView ? "20px 15px" : "60px 30px")};
  max-width: ${(props) =>
    props.token && props.currentPath !== "/edit-profile" && "600px"};

  @media (min-width: 750px) {
    margin-left: ${(props) =>
      props.currentPath !== "/edit-profile" && props.token && "150px"};
    margin-right: ${(props) =>
      props.currentPath !== "/edit-profile" && props.token && "80px"};
  }
`;

const Box = styled.div`
  position: fixed;
  top: 91%;

  left: 0;
  width: 100%;
`;
