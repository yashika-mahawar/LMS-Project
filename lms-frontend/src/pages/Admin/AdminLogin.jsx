import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaArrowRight } from "react-icons/fa";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple Admin Auth Check
    if (email === "admin@icfai.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true"); // Admin access set kar diya
      navigate("/admin"); // Redirect to Admin Dashboard
    } else {
      setError("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="glass-card">
        <div className="admin-avatar">
          <FaUserShield />
        </div>
        <h1>Welcome Admins</h1>
        <p>Authorize to access the management portal</p>
        
        {error && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "10px" }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="field">
            <input 
              type="email" 
              placeholder="Admin Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Login Securely <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;