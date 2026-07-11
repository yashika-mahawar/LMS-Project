import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      if (res.data.success) navigate("/reset-password", { state: { email } });
    } catch (err) { alert("Invalid or Expired OTP!"); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <form onSubmit={handleVerify}>
          <input type="text" placeholder="Enter 6-digit OTP" onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
}
export default VerifyOTP;