import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import WelcomeCard from '../Dashboard/WelcomeCard/WelcomeCard'; 
import { FaUserGraduate, FaBook, FaVideo, FaBell, FaSearch, FaUserCircle, FaChartLine } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Stats ko array mein rakha taaki code clean rahe
  const stats = [
    { title: "Total Students", value: "1,284", icon: <FaUserGraduate />, color: "#4318ff" },
    { title: "Active Courses", value: "42", icon: <FaBook />, color: "#05cd99" },
    { title: "Live Sessions", value: "12", icon: <FaVideo />, color: "#ffb547" },
    { title: "Monthly Growth", value: "+15%", icon: <FaChartLine />, color: "#ef4444" }
  ];

  return (
    <div className="admin-wrapper">
      <div className="sidebar-container">
        <Sidebar isAdmin={true} />
      </div>
      
      <main className="admin-main">
        {/* Professional Header */}
        <header className="top-header">
          <div className="search-bar">
            <FaSearch color="#64748b" />
            <input type="text" placeholder="Search students, courses..." />
          </div>
          <div className="header-actions">
            <div className="notification-icon">
              <FaBell />
              <span className="dot"></span>
            </div>
            <div className="profile-mini">
              <FaUserCircle size={32} color="#4318ff" />
              <span>Admin</span>
            </div>
          </div>
        </header>

        <WelcomeCard isAdmin={true} />

        {/* Header section with text */}
        <div className="dash-header">
          <h1>Dashboard Overview</h1>
          <p>Welcome back, here is what's happening today.</p>
        </div>

        {/* Improved Stats Grid */}
        <section className="stats-grid">
          {stats.map((item, index) => (
            <div className="card" key={index}>
              <div className="icon" style={{ color: item.color }}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="value">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Bottom Section */}
        <div className="bottom-sections">
          <section className="recent-students">
            <h3>Recent Enrollments</h3>
            <table>
              <thead>
                <tr><th>Student</th><th>Course</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>Yashika</td><td>Full Stack</td><td className="status-done">Active</td></tr>
                <tr><td>Rahul</td><td>Data Science</td><td className="status-done">Active</td></tr>
              </tbody>
            </table>
          </section>

          <section className="quick-actions">
            <h3>Notices</h3>
            <div className="notice">System maintenance update at 2 AM.</div>
            <div className="notice">New course approved: AI Masterclass.</div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;