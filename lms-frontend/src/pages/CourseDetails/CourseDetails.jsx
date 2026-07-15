import "./CourseDetails.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";

function CourseDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const course = location.state?.course;

  // Enroll ka logic with performance metrics
  const handleEnroll = () => {
  const existing = JSON.parse(localStorage.getItem("myCourses") || "[]");

  if (!existing.find((c) => c.id === course.id)) {
    const courseWithMetrics = {
      ...course,
      progress: 0,
      attendance: 90,
      cgpa: 8.5,
    };

    localStorage.setItem(
      "myCourses",
      JSON.stringify([...existing, courseWithMetrics])
    );
  }

  navigate("/payment", { state: { course } });
};
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="no-course">
          <h2>No Course Selected</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="course-details">
        {/* LEFT IMAGE */}
        <div className="course-image">
      <img src={course.image} alt={course.title} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="course-info">
          <span className="course-badge">
            🎓 Admissions Open 2026
          </span>

          <h1>{course.title}</h1>

          <p className="course-text">
            {course.description}
          </p>

          {/* INFO CARDS */}
          <div className="info-grid">
            <div className="info-box">
              <h3>⏳ Duration</h3>
              <p>{course.duration}</p>
            </div>
            <div className="info-box">
              <h3>💰 Fee</h3>
              <p>{course.fee}</p>
            </div>
            <div className="info-box">
              <h3>🧑‍🏫 Mode</h3>
              <p>Online / Offline</p>
            </div>
            <div className="info-box">
              <h3>🎯 Eligibility</h3>
              <p>10+2</p>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <h2>✨ Course Highlights</h2>
          <ul className="highlights">
            <li>Industry-Oriented Curriculum</li>
            <li>Experienced Faculty Members</li>
            <li>Hands-on Projects</li>
            <li>Placement Assistance</li>
            <li>Internship Opportunities</li>
            <li>Modern Computer Labs</li>
          </ul>
           <button
            className="enroll-btn"
            onClick={handleEnroll} 
          >
            Enroll Now
          </button>
          
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CourseDetails;