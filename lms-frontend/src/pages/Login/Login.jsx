import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // DUMMY LOGIC (Jab tak backend nahi banta)
    if (email === "test@gmail.com" && password === "1234") {
      setLoading(false);
      alert("Login Successful! (Testing Mode)");
      navigate("/dashboard");
      return;
    }

    // REAL BACKEND LOGIC (Jab backend ban jaye, toh ye code uncomment kar dena)
    /*
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid Email or Password!");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials or server connection.");
    } finally {
      setLoading(false);
    }
    */

    // Temp error message kyunki backend abhi connected nahi hai
    alert("Backend is not connected yet! Use: test@gmail.com / 1234");
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>ICFAI University</h1>
        <h2>Welcome Back!</h2>
        <p>Login to access your dashboard, courses, live classes and learning resources.</p>
      </div>

      <div className="login-right">
        <div className="login-form">
          <h2>Student Login</h2>

          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember Me</span>
              </label>
              <Link to="/forgot-password" style={{ color: "#4f46e5", textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p>
            Don't have an account?
            <Link to="/signup"> Register</Link>
          </p>

          <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Are you an administrator? 
              <Link to="/admin/login" style={{ color: "#4f46e5", fontWeight: "600", marginLeft: "8px", textDecoration: "none" }}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;