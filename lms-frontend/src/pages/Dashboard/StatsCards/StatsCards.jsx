import React from "react";
import "./StatsCards.css";
import useStudentProgress from "../../../hooks/useStudentProgress";

const StatsCards = () => {
  const { enrolledCourses, completedCourses, inProgress, overallProgress, loading } =
    useStudentProgress();

  const statsData = loading
    ? []
    : [
        {
          label: "Enrolled Courses",
          value: enrolledCourses,
          emoji: "📚",
          bgColor: "#eff6ff",
          color: "#1d4ed8",
        },
        {
          label: "Completed",
          value: completedCourses,
          emoji: "✅",
          bgColor: "#ecfdf5",
          color: "#047857",
        },
        {
          label: "In Progress",
          value: inProgress,
          emoji: "⏳",
          bgColor: "#fffbeb",
          color: "#b45309",
        },
        {
          label: "Overall Progress",
          value: `${overallProgress}%`,
          emoji: "📈",
          bgColor: "#f5f3ff",
          color: "#4338ca",
        },
      ];

  return (
    <div className="stats-grid-container">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-single-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: stat.bgColor }}>
            <span className="stat-emoji">{stat.emoji}</span>
          </div>
          <div className="stat-details">
            <h3 className="stat-value" style={{ color: "var(--color-text)" }}>
              {stat.value}
            </h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
