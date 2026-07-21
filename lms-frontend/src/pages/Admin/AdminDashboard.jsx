import React, { useState } from 'react';
import WelcomeCard from '../Dashboard/WelcomeCard/WelcomeCard';
import { FaUserGraduate, FaBook, FaVideo, FaChartLine } from 'react-icons/fa';
import './AdminDashboard.css';
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import useAdminStats from "../../hooks/useAdminStats";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const { students, courses, videos, enrollments, recentEnrollments, error } = useAdminStats();
  const [searchTerm, setSearchTerm] = useState("");

  const chartData = [
    { name: "Students", value: students },
    { name: "Courses", value: courses },
    { name: "Videos", value: videos },
    { name: "Enrollments", value: enrollments },
  ];

  const filteredEnrollments = recentEnrollments.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      item.users?.full_name?.toLowerCase().includes(search) ||
      item.courses?.title?.toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search)
    );
  });

  const stats = [
    { title: "Total Students", value: students, icon: <FaUserGraduate />, color: "#4f46e5" },
    { title: "Total Courses", value: courses, icon: <FaBook />, color: "#05cd99" },
    { title: "Total Videos", value: videos, icon: <FaVideo />, color: "#f59e0b" },
    { title: "Total Course Enrollments", value: enrollments, icon: <FaChartLine />, color: "#ef4444" },
  ];

  return (
    <div className="admin-dashboard">
      <AdminHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search students or courses..."
      />

      <WelcomeCard isAdmin={true} />

      {error && (
        <div className="dashboard-error-banner">
          Couldn't load some dashboard data. Please refresh or try again shortly.
        </div>
      )}

      <div className="dash-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, here is what's happening today.</p>
      </div>

      <section className="stats-grid">
        {stats.map((item, index) => (
          <div className="card" key={index}>
            <div className="icon" style={{ color: item.color }}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p className="value">{item.value}</p>
          </div>
        ))}
      </section>

      <div className="bottom-sections">
        <div className="chart-card">
          <h3>Platform Analytics</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <section className="recent-students">
          <h3>Recent Course Enrollments</h3>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="enrollment-student">
                      <img
                        src={item.users?.profile_image || "https://ui-avatars.com/api/?name=Student"}
                        alt=""
                        className="student-avatar"
                      />
                      {item.users?.full_name}
                    </div>
                  </td>
                  <td>{item.courses?.title}</td>
                  <td className="status-done">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
