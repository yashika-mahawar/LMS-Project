import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import API from "../../services/api"; // Central API service
import './WelcomeCard.css';

const WelcomeCard = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");
  const [lastCourse, setLastCourse] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      // LocalStorage se dynamically user ka naam set kar rahe hain
      setUserName(user.full_name || user.name || "Student");
    }

    if (!user || isAdmin) return;

    const fetchLastCourse = async () => {
      try {
        // Central API use ki progress fetch karne ke liye (No localhost!)
        const response = await API.get(`/api/progress/user/${user.id}`);
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