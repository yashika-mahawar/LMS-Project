import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import { FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';

const Assignments = () => {
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  // Sabhi assignments ka master list
  const allAssignments = [
    { id: 1, title: "DBMS Normalization & Queries", course: "B.Tech Computer Science", dueDate: "05 July 2026", status: "Pending", color: "#ef4444" },
    { id: 2, title: "React Router & Hooks Implementation", course: "BCA", dueDate: "30 June 2026", status: "Submitted", color: "#16a34a" },
    { id: 3, title: "Business Strategy Case Study", course: "MBA", dueDate: "12 July 2026", status: "Pending", color: "#ef4444" },
    { id: 4, title: "Cyber Security Defense Lab", course: "Cyber Security", dueDate: "20 July 2026", status: "Pending", color: "#ef4444" },
  ];

  useEffect(() => {
    // 1. Enrolled courses localStorage se uthao
    const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    
    // 2. Sirf wahi assignment show karo jiska course enrolled list mein ho
    const filtered = allAssignments.filter(task => 
      enrolled.some(course => course.title === task.course)
    );
    
    setFilteredAssignments(filtered);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', width: '100vw', overflowX: 'hidden' }}>
      <aside style={{ width: '260px', minWidth: '260px', height: '100vh', position: 'sticky', top: 0, zIndex: 10 }}>
        <Sidebar />
      </aside>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: 'calc(100vw - 260px)' }}>
        <Header />
        
        <main style={{ padding: '40px', boxSizing: 'border-box', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>Academic Assignments</h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>Upload and track your continuous internal evaluations (CIE).</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((task) => (
                <div key={task.id} style={{ background: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '1.3rem', background: '#f1f5f9', padding: '10px', borderRadius: '10px', display: 'flex', color: '#4f46e5' }}><FaClipboardList /></div>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>{task.title}</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{task.course} • <span style={{ color: '#ef4444', fontWeight: '600' }}>Due: {task.dueDate}</span></p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: task.color, background: task.status === 'Submitted' ? '#f0fdf4' : '#fef2f2', padding: '6px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {task.status === 'Submitted' ? <FaCheckCircle /> : <FaClock />} {task.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#64748b', textAlign: 'center', marginTop: '20px' }}>No assignments for your enrolled courses yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assignments;