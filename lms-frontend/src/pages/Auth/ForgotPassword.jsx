import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("OTP sent to your email!");
      navigate("/verify-otp", { state: { email } });
    } catch (err) { alert("Email not found!"); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSendOTP}>
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;