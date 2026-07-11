import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import './WelcomeCard.css';

const WelcomeCard = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (isAdmin) {
      // Yahan path update kar diya hai taaki route match ho sake
      navigate("/admin/manage-courses");
    } else {
      const saved = localStorage.getItem("lastCourse");
      if (saved) {
        const course = JSON.parse(saved);
        navigate(`/learning/${course.id}`);
      } else {
        alert("Please select a course first!");
      }
    }
  };

  return (
    <div className={`welcome-card-banner ${isAdmin ? 'admin-theme' : ''}`}>
      <div className="welcome-text-content">
        <h1>{isAdmin ? "👋 Welcome Back, Admin" : "👋 Welcome Back, Yashika"}</h1>
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