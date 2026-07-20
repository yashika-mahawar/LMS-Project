import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Activity.css";
import API from "../../../services/api";
const Activity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await API.get(
  `/api/activities/${user.id}`
);

        setActivities(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="activity-card-inner">
      <h3 className="sub-module-title">⏳ Recent Activity</h3>

      <div className="timeline-container">
        {activities.length === 0 ? (
          <p>No Activity Yet</p>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="timeline-item">
              <div className="timeline-dot dot-success"></div>

              <div className="timeline-content">
                <h4>{act.title}</h4>
                <p>{act.description}</p>

                <small>
  {new Date(
    act.created_at.replace(" ", "T") + "Z"
  ).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Activity;