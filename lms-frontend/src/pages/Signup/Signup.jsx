import "./Signup.css";
import { useState } from "react"; // 1. useState import kiya
import { Link, useNavigate } from "react-router-dom"; // 2. useNavigate import kiya

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    password: "",
  });

  const navigate = useNavigate(); // 3. navigate hook initialize kiya

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSignup = (e) => {
  e.preventDefault();

  const user = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    program: formData.program,
    password: formData.password,
    profileImage: "",
  };

  // Current logged in user
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Sabhi users ki list (future login ke liye)
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  // Components ko update karne ke liye
  window.dispatchEvent(new Event("userUpdated"));

  navigate("/dashboard");
};

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>ICFAI University</h1>
        <h2>Start Your Learning Journey</h2>
        <p>
          Register yourself to access courses, assignments,
          live classes and your student dashboard.
        </p>
      </div>

      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSignup}> {/* 5. onSubmit add kiya */}
          <h2>Create Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <select name="program" onChange={handleChange} required>
            <option value="">Select Program</option>
            <option value="B.Tech Computer Science

">B.Tech</option>
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

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;