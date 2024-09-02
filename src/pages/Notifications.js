import styled from "styled-components";
import { useViewNotificationsMutation } from "../redux/api/userApi";

import NotificationItem from "../components/UI/NotificationItem";
import { useEffect } from "react";

const Notifications = ({ notifications }) => {
  const [viewNotifications, { isLoading, isSuccess, isError, error }] =
    useViewNotificationsMutation();

  useEffect(() => {
    const unviewedNotifs = notifications
      .filter((notif) => !notif.viewed)
      .map((notif) => notif._id);

    if (unviewedNotifs.length > 0) {
      viewNotifications(unviewedNotifs);
    }
  }, [notifications]);

  return (
    <Style>
      <h3>Notifications</h3>

      {notifications ? (
        notifications.map((notification, i) => {
          return <NotificationItem notification={notification} key={i} />;
        })
      ) : (
        <p>Loading</p>
      )}
    </Style>
  );
};

const Style = styled.div``;

export default Notifications;
