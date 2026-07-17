import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import axios from "axios";
function Header() {
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

const [notifications, setNotifications] = useState([]);
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");

  return savedUser
    ? JSON.parse(savedUser)
    : {
        full_name: "Guest",
        profile_image: "",
      };
});

useEffect(() => {
  const updateUser = () => {
  const savedUser = localStorage.getItem("user");

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
const fetchNotifications = async () => {
  try {

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!savedUser?.id) return;

    const res = await axios.get(
      `http://localhost:5000/api/notifications/${savedUser.id}`
    );

setNotifications(res.data.notifications || []);
  } catch (err) {

    console.log(err);

  }
};
useEffect(() => {
  fetchNotifications();
}, []);

  return (
    <header className="dashboard-header" style={{ position: "relative" }}>
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search your courses, assignments, updates..." />
      </div>

      <div className="header-right">
        <div
  className="notification"
  title="Notifications"
  style={{ position: "relative" }}
>

  <FaBell
    className="bell-icon"
    onClick={() =>
      setShowNotifications(!showNotifications)
    }
    style={{ cursor: "pointer" }}
  />

  <span className="badge">
  {notifications?.length || 0}
</span>

  {showNotifications && (

    <div
      style={{
        position: "absolute",
        top: "40px",
        right: "0",
        width: "300px",
        background: "#fff",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.2)",
        zIndex: 999,
      }}
    >

      <h4>Notifications</h4>

{notifications?.length === 0 ? (
        <p>No Notifications</p>

      ) : (

notifications?.map((note) => (
          <div
            key={note.id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "10px 0",
            }}
          >

            <p>{note.message}</p>

            <small>

              {new Date(
                note.created_at
              ).toLocaleDateString()}

            </small>

          </div>

        ))

      )}

    </div>

  )}

</div>

        {/* Profile Segment */}
        <div 
          className="profile" 
          title="View Profile" 
          onClick={() => setShowProfileBox(!showProfileBox)} 
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div className="profile-avatar-wrapper" style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            {user.profile_image ? (
  <img 
    src={user.profile_image} 
    alt="Profile" 
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover' 
    }} 
  />
) : (
              <FaUserCircle className="avatar-svg" size={40} color="#cbd5e1" />
            )}
          </div>
          <div className="profile-info-text">
            {/* Yahan 'Yashika' ki jagah dynamic {userName} use kiya hai */}
            <span className="user-name">{user.full_name}</span>
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
              <p style={{ margin: 0 }}><strong>Name:</strong>{user.full_name}</p>
              <p style={{ margin: 0 }}><strong>Roll No:</strong> ICFAI-2026-001</p>
              <p style={{ margin: 0 }}><strong>Course:</strong> {user.program}</p>
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