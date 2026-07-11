import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import './AdminDashboard.css';

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "B.Tech Computer Science", duration: "4 Years", fee: "₹49,999" },
    { id: 2, title: "MBA", duration: "2 Years", fee: "₹69,999" },
    { id: 3, title: "BCA", duration: "3 Years", fee: "₹39,999" },
    { id: 4, title: "MCA", duration: "2 Years", fee: "₹45,999" },
    { id: 5, title: "M.Tech", duration: "2 Years", fee: "₹79,999" },
    { id: 6, title: "LLB", duration: "3 Years", fee: "₹59,999" },
    { id: 7, title: "BA", duration: "3 Years", fee: "₹29,999" },
    { id: 8, title: "B.Com", duration: "3 Years", fee: "₹34,999" },
    { id: 9, title: "Diploma in IT", duration: "2 Years", fee: "₹19,999" },
    { id: 10, title: "Cyber Security", duration: "1 Year", fee: "₹24,999" },
  ]);

  const [editId, setEditId] = useState(null);
  const [tempData, setTempData] = useState({});

  const startEdit = (course) => {
    setEditId(course.id);
    setTempData({ ...course });
  };

  const saveEdit = () => {
    setCourses(courses.map(c => (c.id === editId ? tempData : c)));
    setEditId(null);
  };

  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="sidebar-container"><Sidebar isAdmin={true} /></div>
      
      <main className="admin-main">
        <div className="header-box">
          <h1>Manage Courses</h1>
          <p>Total active programs: <strong>{courses.length}</strong></p>
        </div>

        <table className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                {editId === course.id ? (
                  <>
                    <td><input value={tempData.title} onChange={(e) => setTempData({...tempData, title: e.target.value})} /></td>
                    <td><input value={tempData.duration} onChange={(e) => setTempData({...tempData, duration: e.target.value})} /></td>
                    <td><input value={tempData.fee} onChange={(e) => setTempData({...tempData, fee: e.target.value})} /></td>
                    <td>
                      <button onClick={saveEdit} className="icon-btn save"><FaSave color="green" /></button>
                      <button onClick={() => setEditId(null)} className="icon-btn cancel"><FaTimes color="gray" /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{course.title}</td>
                    <td>{course.duration}</td>
                    <td>{course.fee}</td>
                    <td>
                      <button onClick={() => startEdit(course)} className="icon-btn edit"><FaEdit color="#4318ff" /></button>
                      <button onClick={() => deleteCourse(course.id)} className="icon-btn trash"><FaTrash color="red" /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ManageCourses;