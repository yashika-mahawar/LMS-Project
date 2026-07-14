import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          `http://localhost:5000/api/activities/${user.id}`
        );

        setNotifications(res.data.data || []);
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
              <h4 className="alert-heading">{note.title}</h4>
              <p className="alert-desc">{note.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;