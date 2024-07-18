import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, timeout } from "../../redux/slices/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { notification } from "antd";

const RequireAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const didTimeout = useSelector((state) => state.auth.timeout);
  const didLogout = useSelector((state) => state.auth.didLogout);
  const token = useSelector((state) => state.auth.token);
  const sessionExpirationTime = useSelector(
    (state) => state.auth.sessionExpiresAt
  );

  const currentTime = Date.now();

  useEffect(() => {
    if (didLogout === false && !token && didTimeout === false) {
      dispatch(logout());

      notification.error({
        message: "You must be signed in.",
        duration: 2,
        placement: "bottomRight",
      });
      navigate("/login");
      return;
    }
  }, [navigate, token, dispatch, didTimeout]);

  useEffect(() => {
    if (sessionExpirationTime) {
      if (currentTime > sessionExpirationTime) {
        dispatch(timeout());

        notification.error({
          message: "Your session has expired, please sign in again",
          duration: 2,
          placement: "bottomRight",
        });
        navigate("/login");
      }
    }
    return;
  }, [dispatch, currentTime, sessionExpirationTime, navigate]);

  useEffect(() => {
    if (didLogout) {
      notification.success({
        message: "Hope to see you again soon:(",
        duration: 2,
        placement: "topLeft",
      });
    }
  }, [didLogout]);

  if (!token) {
    return navigate("/login");
  }

  return <Outlet />;
};

export default RequireAuth;
