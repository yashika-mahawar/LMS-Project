import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";
import API from "../../../services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await API.get(
  `/api/notifications/${user.id}`
);
setNotifications(res.data.notifications || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-card-inner">
      <h3 className="sub-module-title">🔔 Notifications</h3>

      <div className="notifications-stack">
        {notifications.length === 0 ? (
          <p>No Notifications</p>
        ) : (
          notifications.map((note) => (
  <div key={note.id} className="alert-box">
    <p className="alert-desc">{note.message}</p>

    <small
      style={{
        color: "#777",
        display: "block",
        marginTop: "6px",
      }}
    >
      {new Date(note.created_at).toLocaleDateString()}
    </small>
  </div>
))
        )}
      </div>
    </div>
  );
};

export default Notifications;