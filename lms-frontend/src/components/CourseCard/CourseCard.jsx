import { Link } from "react-router-dom";
import "./CourseCard.css";

import Course1 from "../../assets/Course1.jpg";
import Course2 from "../../assets/Course2.jpg";
import Course3 from "../../assets/Course3.jpeg";
import Course4 from "../../assets/Course4.png";
import Course5 from "../../assets/Course5.jpeg";
import Course6 from "../../assets/Course6.jpeg";
import Course7 from "../../assets/Course7.jpeg";
import Course8 from "../../assets/Course8.jpeg";
import Course9 from "../../assets/Course9.jpeg";
import Course10 from "../../assets/Course10.jpeg";

function CourseCard() {
  const courses = [
    { id: 1, title: "B.Tech Computer Science", description: "Learn programming, AI, Data Science and Software Development.", duration: "4 Years", fee: "₹49,999", image: Course1 },
    { id: 2, title: "MBA", description: "Develop leadership and business management skills.", duration: "2 Years", fee: "₹69,999", image: Course2 },
    { id: 3, title: "BCA", description: "Learn Web Development, Programming and Databases.", duration: "3 Years", fee: "₹39,999", image: Course3 },
    { id: 4, title: "MCA", description: "Advanced programming, software development & systems.", duration: "2 Years", fee: "₹45,999", image: Course4 },
    { id: 5, title: "M.Tech", description: "Advanced engineering, AI systems & research skills.", duration: "2 Years", fee: "₹79,999", image: Course5 },
    { id: 6, title: "LLB", description: "Law studies, legal systems & courtroom practice.", duration: "3 Years", fee: "₹59,999", image: Course6 },
    { id: 7, title: "BA", description: "Arts, humanities, communication & social sciences.", duration: "3 Years", fee: "₹29,999", image: Course7 },
    { id: 8, title: "B.Com", description: "Commerce, accounting, finance & business studies.", duration: "3 Years", fee: "₹34,999", image: Course8 },
    { id: 9, title: "Diploma in IT", description: "Practical IT skills, networking & development basics.", duration: "2 Years", fee: "₹19,999", image: Course9 },
    { id: 10, title: "Cyber Security", description: "Ethical hacking, security systems & cyber defense.", duration: "1 Year", fee: "₹24,999", image: Course10 },
  ];

  // Ye function save karega
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
            <img src={course.image} alt={course.title} />

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

              {/* Yahan humne function call kiya hai */}
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