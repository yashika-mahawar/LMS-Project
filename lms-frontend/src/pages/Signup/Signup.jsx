import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../services/api"; // (path apne folder structure ke hisaab se check kar lena)
import {
  FaGraduationCap,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBookOpen,
  FaUniversity,
  FaUserTie,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaChalkboardTeacher,
  FaAward,
} from "react-icons/fa";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    collegeName: "",
    fatherName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/register`,
  {
    full_name: formData.name,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    role: "student",
    program: formData.program,
    college_name: formData.collegeName,
    father_name: formData.fatherName,
  }
);

    localStorage.setItem("token", res.data.token);

const userData = {
  ...res.data.user,
  phone: formData.phone,
  program: formData.program,
  college_name: formData.collegeName,
  father_name: formData.fatherName,
};

localStorage.setItem("user", JSON.stringify(userData));

    alert("Registration Successful!");
    navigate("/dashboard");
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Signup Failed");
  }
};
  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="auth-blob auth-blob-1"></div>
        <div className="auth-blob auth-blob-2"></div>

        <div className="auth-brand">
          <FaGraduationCap />
          <span>TVI Academy</span>
        </div>

        <h2>Start Your Learning Journey</h2>
        <p>Register yourself to access courses, assignments, live classes and your student dashboard.</p>

        <ul className="auth-highlights">
          <li>
            <FaBookOpen />
            <span>Choose from 10+ industry-relevant programs</span>
          </li>
          <li>
            <FaChalkboardTeacher />
            <span>Learn from experienced faculty</span>
          </li>
          <li>
            <FaAward />
            <span>Get certified on course completion</span>
          </li>
        </ul>
      </div>

      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSignup}>
          <span className="auth-form-badge">Student Registration</span>
          <h2>Create your account</h2>
          <p className="auth-form-subtitle">Fill in your details to get started.</p>

          <div className="auth-input-group">
            <FaUser className="auth-input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <FaUserTie className="auth-input-icon" />
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <FaEnvelope className="auth-input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <FaPhone className="auth-input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="[0-9+\-\s]{10,15}"
              title="Enter a valid phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <FaUniversity className="auth-input-icon" />
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <FaBookOpen className="auth-input-icon" />
            <select name="program" value={formData.program} onChange={handleChange} required>
              <option value="" disabled>Select Program</option>
              <option value="B.Tech Computer Science">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
              <option value="BA">BA</option>
              <option value="MCA">MCA</option>
              <option value="B.Com">B.Com</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="M.Tech">M.Tech</option>
              <option value="LLB">LLB</option>
              <option value="Diploma in IT">Diploma in IT</option>
            </select>
          </div>

          <div className="auth-input-group">
            <FaLock className="auth-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="auth-toggle-visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="auth-submit-btn">Register</button>
          <p>Already have an account? <Link to="/login"> Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
