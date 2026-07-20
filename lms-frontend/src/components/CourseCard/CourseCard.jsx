import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CourseCard.css";

function CourseCard() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
  fetchCourses();
}, []);

const fetchCourses = async () => {
  try {
    const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/courses/courses`
);
    setCourses(res.data.courses);

  } catch (err) {
    console.log(err);
  }
};

  const handleViewDetails = (course) => {
    localStorage.setItem("lastCourse", JSON.stringify(course));
  };

  return (
    <section className="courses-section" id="courses">
      <h2 className="course-heading">Our Popular Courses</h2>
      <p className="course-subheading">
        Explore industry-oriented programs offered by ICFAI University.
      </p>

      <div className="course-container">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <img src={course.image_url} alt={course.title} />

            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="course-details">
                <span>
                  <strong>Duration:</strong> {course.duration}
                </span>
                <span>
                  <strong>Fee:</strong> {course.fee}
                </span>
              </div>

              <Link
                to="/course-details"
                className="course-btn"
                state={{ course }}
                onClick={() => handleViewDetails(course)}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CourseCard;