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
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const courseData = {
    "B.Tech Computer Science": { id: "25ca217b-f1f1-4d20-aa2f-2befa1bd83ee", fee: "₹49,999", duration: "4 Years", image: "Course1.jpg" },
    BCA: { id: "c65f00bf-7538-4ef0-8d19-d2df867cc1a0", fee: "₹39,999", duration: "3 Years", image: "Course3.jpeg" },
    MBA: { id: "abdd6c51-8345-49ef-bb53-a20bda0e7c94", fee: "₹69,999", duration: "2 Years", image: "Course2.jpg" },
    MCA: { id: "4101d935-1836-4e61-bd60-611c172230b2", fee: "₹45,999", duration: "2 Years", image: "Course4.png" },
    "M.Tech": { id: "9f557fbb-8b70-4a02-be19-6626d689458e", fee: "₹79,999", duration: "2 Years", image: "Course5.jpeg" },
    LLB: { id: "c08262ef-79f6-4f8f-ab99-04a517303362", fee: "₹59,999", duration: "3 Years", image: "Course6.jpeg" },
    BA: { id: "c6d44e43-b9ff-4ae0-b45e-032c29524731", fee: "₹29,999", duration: "3 Years", image: "Course7.jpeg" },
    "B.Com": { id: "05c00d77-e7b4-4cee-8701-bbf4ca52c92e", fee: "₹34,999", duration: "3 Years", image: "Course8.jpeg" },
    "Diploma in IT": { id: "61ca6734-cd58-430d-9c61-a68b22677d76", fee: "₹19,999", duration: "2 Years", image: "Course9.jpeg" },
    "Cyber Security": { id: "d9b45594-c982-4470-ada5-f95fd04a2696", fee: "₹24,999", duration: "1 Year", image: "Course10.jpeg" },
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
  }
);

    localStorage.setItem("token", res.data.token);

const userData = {
  ...res.data.user,
    phone: formData.phone,
  program: formData.program,
};

localStorage.setItem("user", JSON.stringify(userData));

    const selectedCourse = courseData[formData.program];

    const course = {
      id: selectedCourse.id,
      title: formData.program,
      duration: selectedCourse.duration,
      fee: selectedCourse.fee,
      image: selectedCourse.image,
    };

    navigate("/payment", { state: { course } });
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
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          </div>

          <div className="auth-input-group">
            <FaEnvelope className="auth-input-icon" />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          </div>

          <div className="auth-input-group">
            <FaPhone className="auth-input-icon" />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </div>

          <div className="auth-input-group">
            <FaBookOpen className="auth-input-icon" />
            <select name="program" onChange={handleChange} defaultValue="" required>
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
