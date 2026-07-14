import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Activity.css";

const Activity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          `http://localhost:5000/api/activities/${user.id}`
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
                  {new Date(act.created_at).toLocaleString()}
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