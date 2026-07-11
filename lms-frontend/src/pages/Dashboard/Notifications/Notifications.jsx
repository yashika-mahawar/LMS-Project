import React from 'react';
import './Notifications.css';

const Notifications = () => {
  const notificationList = [
    { title: 'New React Course Added', desc: 'Enroll now and start learning today.' },
    { title: 'Quiz Tomorrow', desc: 'Java Programming Quiz starts at 10:00 AM.' }
  ];

  return (
    <div className="notifications-card-inner">
      <h3 className="sub-module-title">🔔 Notifications</h3>
      <div className="notifications-stack">
        {notificationList.map((note, index) => (
          <div key={index} className="alert-box">
            <h4 className="alert-heading">{note.title}</h4>
            <p className="alert-desc">{note.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;