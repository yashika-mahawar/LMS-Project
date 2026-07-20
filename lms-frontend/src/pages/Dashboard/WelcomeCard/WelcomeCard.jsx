import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import './WelcomeCard.css';
import API from "../../services/api";

const WelcomeCard = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [lastCourse, setLastCourse] = useState(null);
  useEffect(() => {
  const fetchLastCourse = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

if (!user) return;

if (!isAdmin) {
  setUserName(user.full_name || user.name || "Student");
}

if (isAdmin) return;

      const response = await API.get(
  `/api/progress/user/${user.id}`
);

const courses = response.data.courses;


      if (courses && courses.length > 0) {
        setLastCourse(courses[0]);
      }

    } catch (error) {
      console.error("Welcome Card Error:", error);
    }
  };

  fetchLastCourse();
}, [isAdmin]);
  const handleAction = () => {
    if (isAdmin) {
      // Yahan path update kar diya hai taaki route match ho sake
      navigate("/admin/manage-courses");
    } else {
      if (lastCourse) {
  navigate(`/learning/${lastCourse.courseId}`);
} else {
  alert("Please enroll in a course first!");
}
    }
  };

  return (
    <div className={`welcome-card-banner ${isAdmin ? 'admin-theme' : ''}`}>
      <div className="welcome-text-content">
        <h1>
  {isAdmin 
    ? "👋 Welcome Back, Admin" 
    : `👋 Welcome Back, ${userName}`
  }
</h1>
        <p>
          {isAdmin 
            ? "Manage your university portal, student data, and course curriculum." 
            : "Continue your learning journey at ICFAI University."}
        </p>
      </div>
      
      <button className="continue-learning-btn" onClick={handleAction}>
        {isAdmin ? (
          <><FaPlusCircle style={{ marginRight: '8px' }} /> Manage Courses</>
        ) : (
          <><span className="play-icon">▶</span> Continue Learning</>
        )}
      </button>
    </div>
  );
};

export default WelcomeCard;