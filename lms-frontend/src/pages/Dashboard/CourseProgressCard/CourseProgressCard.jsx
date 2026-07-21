import React from "react";
import "./CourseProgressCard.css";

const CourseProgressCard = ({ course }) => {
  return (
    <div className="course-progress-card">
      <div>
        <span className="course-progress-card__badge">
          {course.completedVideos} / {course.totalVideos} Videos
        </span>
        <h3 className="course-progress-card__title">{course.title}</h3>
        <p className="course-progress-card__subtext">
          {course.completedVideos} Videos Completed
        </p>
      </div>

      <div>
        <div className="course-progress-card__meta">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="course-progress-card__track">
          <div
            className="course-progress-card__fill"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;
