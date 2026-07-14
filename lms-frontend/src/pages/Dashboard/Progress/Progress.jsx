import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import { useEffect, useState } from "react";
const Progress = () => {
  const [progressData, setProgressData] = useState(null);
  useEffect(() => {
  const fetchProgress = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/progress/user/${user.id}`
      );

      const result = await response.json();

      if (result.success) {
        setProgressData(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchProgress();
}, []);
  const stats = progressData
  ? [
      {
        id: 1,
        label: "Enrolled Courses",
        value: progressData.enrolledCourses,
        subtext: "Total Enrolled",
        color: "#4f46e5",
      },
      {
        id: 2,
        label: "Completed Courses",
        value: progressData.completedCourses,
        subtext: "Finished",
        color: "#16a34a",
      },
      {
        id: 3,
        label: "In Progress",
        value: progressData.inProgress,
        subtext: "Ongoing",
        color: "#f59e0b",
      },
      {
        id: 4,
        label: "Overall Progress",
        value: `${progressData.overallProgress}%`,
        subtext: "Across All Courses",
        color: "#06b6d4",
      },
    ]
  : [];
if (!progressData) {
  return <h2 style={{ padding: "40px" }}>Loading...</h2>;
}
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', width: '100vw', overflowX: 'hidden' }}>
      <aside style={{ width: '260px', minWidth: '260px', height: '100vh', position: 'sticky', top: 0, zIndex: 10 }}>
        <Sidebar />
      </aside>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: 'calc(100vw - 260px)' }}>
        <Header />
        
        <main style={{ padding: '40px', boxSizing: 'border-box', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>Performance Analytics</h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>Track your academic metrics, credits, and attendance scores.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div
  style={{
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    marginBottom: "30px",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>Course Progress</h2>

  {progressData.courses.map((course) => (
    <div key={course.courseId} style={{ marginBottom: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <strong>{course.title}</strong>
        <span>{course.progress}%</span>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${course.progress}%`,
            height: "100%",
            background: "#22c55e",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "8px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        {course.completedVideos} / {course.totalVideos} Videos Completed
      </p>
    </div>
  ))}
</div>
            {stats.map(stat => (
              <div key={stat.id} style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.02)' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>{stat.label}</p>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.8rem', fontWeight: '800', color: stat.color }}>{stat.value}</h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{stat.subtext}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff', padding: '32px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: '700' }}>Great Academic Standings! 🌟</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>You have maintained consistent attendance targets.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '10px' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>TOTAL CREDITS</p>
              <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: '#38bdf8' }}>52 / 160</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Progress;