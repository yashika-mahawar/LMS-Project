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
const courseData = {
  "B.Tech Computer Science": {
    fee: "₹49,999",
    duration: "4 Years",
    image: "Course1.jpg",
  },
  BCA: {
    fee: "₹39,999",
    duration: "3 Years",
    image: "Course3.jpeg",
  },
  MBA: {
    fee: "₹69,999",
    duration: "2 Years",
    image: "Course2.jpg",
  },
  MCA: {
    fee: "₹45,999",
    duration: "2 Years",
    image: "Course4.png",
  },
  "M.Tech": {
    fee: "₹79,999",
    duration: "2 Years",
    image: "Course5.jpeg",
  },
  LLB: {
    fee: "₹59,999",
    duration: "3 Years",
    image: "Course6.jpeg",
  },
  BA: {
    fee: "₹29,999",
    duration: "3 Years",
    image: "Course7.jpeg",
  },
  "B.Com": {
    fee: "₹34,999",
    duration: "3 Years",
    image: "Course8.jpeg",
  },
  "Diploma in IT": {
    fee: "₹19,999",
    duration: "2 Years",
    image: "Course9.jpeg",
  },
  "Cyber Security": {
    fee: "₹24,999",
    duration: "1 Year",
    image: "Course10.jpeg",
  },
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

  // Payment ke baad use save karenge
  localStorage.setItem("pendingUser", JSON.stringify(user));

  // Program ko course ki tarah pass karo
  const selectedCourse = courseData[formData.program];

const course = {
  id: Date.now(),
  title: formData.program,
  description: `${formData.program} Admission Registration`,
  duration: selectedCourse.duration,
  fee: selectedCourse.fee,
  image: selectedCourse.image,
};

  navigate("/payment", {
    state: { course },
  });
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