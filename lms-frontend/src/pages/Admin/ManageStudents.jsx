import React, { useState, useMemo } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './AdminDashboard.css';

const ManageStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [students] = useState([
    { id: 1, name: "Aarav Sharma", course: "B.Tech Computer Science", status: "Active" },
    { id: 2, name: "Priya Verma", course: "MBA", status: "Active" },
    { id: 3, name: "Rahul Singh", course: "BCA", status: "Inactive" },
    { id: 4, name: "Sneha Gupta", course: "MCA", status: "Active" },
    { id: 5, name: "Vikram Mehta", course: "Cyber Security", status: "Active" },
    { id: 6, name: "Ananya Rao", course: "M.Tech", status: "Active" },
    { id: 7, name: "Karan Johar", course: "LLB", status: "Pending" },
    { id: 8, name: "Ishaan Khatter", course: "BA", status: "Active" },
    { id: 9, name: "Zara Khan", course: "B.Com", status: "Active" },
    { id: 10, name: "Manoj Bajpayee", course: "Diploma in IT", status: "Active" }
  ]);

  const filtered = useMemo(() => students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm, students]);

  const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="admin-wrapper">
      <div className="sidebar-container"><Sidebar isAdmin={true} /></div>
      <main className="admin-main">
        <div className="glass-header">
          <h1>Student Directory</h1>
          <div className="search-glow">
            <FaSearch />
            <input placeholder="Filter students..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="table-container">
          <table className="unique-table">
            <thead>
              <tr><th>Student Name</th><th>Course</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {currentData.map((s) => (
                <tr key={s.id}>
                  <td><div className="avatar-name"><span>{s.name[0]}</span> {s.name}</div></td>
                  <td><span className="course-tag">{s.course}</span></td>
                  <td><span className={`status-dot ${s.status.toLowerCase()}`}>{s.status}</span></td>
                  <td>
                    <button className="glow-btn edit"><FaEdit /></button>
                    <button className="glow-btn delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modern-pagination">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))}><FaChevronLeft /></button>
          <span className="page-info">Page {currentPage}</span>
          <button onClick={() => setCurrentPage(p => p + 1)}><FaChevronRight /></button>
        </div>
      </main>
    </div>
  );
};
export default ManageStudents;