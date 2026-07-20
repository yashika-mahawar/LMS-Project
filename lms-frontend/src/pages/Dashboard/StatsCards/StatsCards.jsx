import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StatsCards.css";
import API from "../../../services/api";
const StatsCards = () => {
  const [statsData, setStatsData] = useState([]);
  useEffect(() => {
  const fetchStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const response = await API.get(
  `/api/progress/user/${user.id}`
);

      const data = response.data;

      setStatsData([
        {
          label: "Enrolled Courses",
          value: data.enrolledCourses,
          emoji: "📚",
          bgColor: "#eff6ff",
          color: "#1d4ed8",
        },
        {
          label: "Completed",
          value: data.completedCourses,
          emoji: "✅",
          bgColor: "#ecfdf5",
          color: "#047857",
        },
        {
          label: "In Progress",
          value: data.inProgress,
          emoji: "⏳",
          bgColor: "#fffbeb",
          color: "#b45309",
        },
        {
          label: "Overall Progress",
          value: `${data.overallProgress}%`,
          emoji: "📈",
          bgColor: "#f5f3ff",
          color: "#4338ca",
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  fetchStats();
}, []);
  
  return (
    <div className="stats-grid-container">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-single-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: stat.bgColor }}>
            <span className="stat-emoji">{stat.emoji}</span>
          </div>
          <div className="stat-details">
            <h3 className="stat-value" style={{ color: '#0f172a' }}>{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;