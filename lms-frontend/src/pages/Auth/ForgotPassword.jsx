import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import API from "../../services/api";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(
  "/api/auth/forgot-password",
  { email }
);
      alert("OTP sent to your WhatsApp number!");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Email not found!");
    }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-card-subtitle">
          Enter the email linked to your account and we'll send a verification code to your registered WhatsApp number.
        </p>
        <form onSubmit={handleSendOTP}>
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send OTP via WhatsApp"}</button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;