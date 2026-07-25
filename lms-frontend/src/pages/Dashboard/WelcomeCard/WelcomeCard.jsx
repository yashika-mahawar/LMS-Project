import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaPlay } from 'react-icons/fa';
import './WelcomeCard.css';
import useStudentProgress from "../../../hooks/useStudentProgress";

const WelcomeCard = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [userName] = useState(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    const user = JSON.parse(savedUser);
    return user.full_name || "Student";
  }

  return "Student";
});
  const { courses } = useStudentProgress();
  const lastCourse = !isAdmin && courses.length > 0 ? courses[0] : null;

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

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className={`welcome-card-banner ${isAdmin ? 'admin-theme' : ''}`}>
      <div className="welcome-blob welcome-blob-1"></div>
      <div className="welcome-blob welcome-blob-2"></div>

      <div className="welcome-identity">
        <div className="welcome-avatar">{userName.charAt(0).toUpperCase()}</div>

        <div className="welcome-text-content">
          <span className="welcome-eyebrow">{isAdmin ? "Admin Console" : today}</span>
          <h1>
    {isAdmin
      ? "Welcome Back, Admin"
      : `Welcome back, ${userName.split(" ")[0]}`
    }
  </h1>
          <p>
            {isAdmin
              ? "Manage your university portal, student data, and course curriculum."
              : "Continue your learning journey at ICFAI University."}
          </p>
        </div>
      </div>

      <button className="continue-learning-btn" onClick={handleAction}>
        {isAdmin ? (
          <><FaPlusCircle /> Manage Courses</>
        ) : (
          <><FaPlay /> Continue Learning</>
        )}
      </button>
    </div>
  );
};

export default WelcomeCard;
