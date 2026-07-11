import React from 'react';
import './StatsCards.css';

const StatsCards = () => {
  const statsData = [
    { label: 'Total Courses', value: '10', emoji: '📚', bgColor: '#eff6ff', color: '#1d4ed8' },
    { label: 'Completed', value: '4', emoji: '✅', bgColor: '#ecfdf5', color: '#047857' },
    { label: 'Ongoing', value: '6', emoji: '⏳', bgColor: '#fffbeb', color: '#b45309' },
    { label: 'Assignments', value: '3', emoji: '📝', bgColor: '#fff1f2', color: '#be123c' },
    { label: 'Certificates', value: '2', emoji: '🏆', bgColor: '#faf5ff', color: '#6b21a8' },
    { label: 'Overall Progress', value: '70%', emoji: '📈', bgColor: '#f5f3ff', color: '#4338ca' },
  ];

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