import React from 'react';
import './Activity.css';

const Activity = () => {
  const activities = [
    { text: 'HTML Module Completed', time: 'Today at 10:30 AM', type: 'success' },
    { text: 'Assignment Submitted (DBMS)', time: 'Yesterday', type: 'info' }
  ];

  return (
    <div className="activity-card-inner">
      <h3 className="sub-module-title">⏳ Recent Activity</h3>
      <div className="timeline-container">
        {activities.map((act, index) => (
          <div key={index} className="timeline-item">
            <div className={`timeline-dot dot-${act.type}`}></div>
            <div className="timeline-content">
              <h4>{act.text}</h4>
              <p>{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;