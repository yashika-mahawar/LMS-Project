import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import WelcomeCard from '../Dashboard/WelcomeCard/WelcomeCard'; 
import { FaUserGraduate, FaBook, FaVideo, FaBell, FaSearch, FaUserCircle, FaChartLine } from 'react-icons/fa';
import './AdminDashboard.css';
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useEffect, useState } from "react";
import axios from "axios";
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
  const [statsData, setStatsData] = useState({
  students: 0,
  courses: 0,
  videos: 0,
  enrollments: 0,
});
const chartData = [
  {
    name: "Students",
    value: statsData.students,
  },
  {
    name: "Courses",
    value: statsData.courses,
  },
  {
    name: "Videos",
    value: statsData.videos,
  },
  {
    name: "Enrollments",
    value: statsData.enrollments,
  },
];
const [recentEnrollments, setRecentEnrollments] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const filteredEnrollments = recentEnrollments.filter((item) => {

  const search = searchTerm.toLowerCase();

  return (
    item.users?.full_name?.toLowerCase().includes(search) ||
    item.courses?.title?.toLowerCase().includes(search) ||
    item.status?.toLowerCase().includes(search)
  );

});
useEffect(() => {
  fetchDashboard();
  fetchRecentEnrollments();
}, []);
const fetchDashboard = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/admin/dashboard"
    );

    setStatsData(res.data);
  } catch (err) {
    console.log(err);
  }
};
const fetchRecentEnrollments = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/admin/recent-enrollments"
    );
    

    setRecentEnrollments(res.data.enrollments);
  } catch (err) {
    console.log(err);
  }
};
  // Stats ko array mein rakha taaki code clean rahe
  const stats = [
  {
    title: "Total Students",
    value: statsData.students,
    icon: <FaUserGraduate />,
    color: "#4318ff",
  },
  {
    title: "Total Courses",
    value: statsData.courses,
    icon: <FaBook />,
    color: "#05cd99",
  },
  {
    title: "Total Videos",
    value: statsData.videos,
    icon: <FaVideo />,
    color: "#ffb547",
  },
  {
    title: "Total Enrollments",
    value: statsData.enrollments,
    icon: <FaChartLine />,
    color: "#ef4444",
  },
];

  return (
    <div className="admin-wrapper">
      <div className="sidebar-container">
        <Sidebar isAdmin={true} />
      </div>
      
      <main className="admin-main">
        {/* Professional Header */}
        <AdminHeader
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  placeholder="Search students or courses..."
/>

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

<div className="chart-card">

<h3>Platform Analytics</h3>

<div style={{ width: "100%", height: 320 }}>

<ResponsiveContainer>

<BarChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="name" />

<YAxis />

<Tooltip />

<Bar
dataKey="value"
fill="#4318ff"
radius={[8,8,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

<section className="recent-students">

<h3>Recent Enrollments</h3>

<table>

<thead>

<tr>

<th>Student</th>

<th>Course</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{filteredEnrollments.map((item)=>(
<tr key={item.id}>

<td>

<div
style={{
display:"flex",
alignItems:"center",
gap:"10px",
}}
>

<img
src={
item.users?.profile_image ||
"https://ui-avatars.com/api/?name=Student"
}
alt=""
className="student-avatar"
/>

{item.users?.full_name}

</div>

</td>

<td>

{item.courses?.title}

</td>

<td className="status-done">

Active

</td>

</tr>
))}

</tbody>

</table>

</section>

</div>
      </main>
    </div>
  );
};

export default AdminDashboard;