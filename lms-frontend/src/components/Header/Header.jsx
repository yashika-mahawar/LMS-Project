import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
  const [showProfileBox, setShowProfileBox] = useState(false);
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("currentUser");

  return savedUser
    ? JSON.parse(savedUser)
    : {
        name: "Guest",
        profileImage: "",
      };
});

useEffect(() => {
  const updateUser = () => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  updateUser();

  window.addEventListener("userUpdated", updateUser);

  return () => {
    window.removeEventListener("userUpdated", updateUser);
  };
}, []);

  return (
    <header className="dashboard-header" style={{ position: "relative" }}>
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search your courses, assignments, updates..." />
      </div>

      <div className="header-right">
        <div className="notification" title="Notifications">
          <FaBell className="bell-icon" />
          <span className="badge">3</span>
        </div>

        {/* Profile Segment */}
        <div 
          className="profile" 
          title="View Profile" 
          onClick={() => setShowProfileBox(!showProfileBox)} 
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div className="profile-avatar-wrapper" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <FaUserCircle className="avatar-svg" size={40} color="#cbd5e1" />
            )}
          </div>
          <div className="profile-info-text">
            {/* Yahan 'Yashika' ki jagah dynamic {userName} use kiya hai */}
            <span className="user-name">{user.name}</span>
            <span className="user-role">Student Portal</span>
          </div>
        </div>

        {/* Dropdown Box */}
        {showProfileBox && (
          <div
            style={{
              position: "absolute",
              top: "70px",
              right: "20px",
              width: "260px",
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              border: "1px solid #e2e8f0",
              zIndex: 1000,
              color: "#333"
            }}
          >
            <div style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "2" }}>
              <p style={{ margin: 0 }}><strong>Name:</strong>{user.name}</p>
              <p style={{ margin: 0 }}><strong>Roll No:</strong> ICFAI-2026-001</p>
              <p style={{ margin: 0 }}><strong>Course:</strong> B.Tech Computer Science</p>
            </div>
            <button
              onClick={() => setShowProfileBox(false)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "8px",
                background: "#4f46e5",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;