import { Link } from "react-router-dom";
import "./CourseCard.css";

function CourseCard() {
  const courses = [
    { id: 1, title: "B.Tech Computer Science", description: "Learn programming, AI, Data Science and Software Development.", duration: "4 Years", fee: "₹49,999", image: "/Course1.jpg" },
    { id: 2, title: "MBA", description: "Develop leadership and business management skills.", duration: "2 Years", fee: "₹69,999", image: "/Course2.jpg" },
    { id: 3, title: "BCA", description: "Learn Web Development, Programming and Databases.", duration: "3 Years", fee: "₹39,999", image: "/Course3.jpeg" },
    { id: 4, title: "MCA", description: "Advanced programming, software development & systems.", duration: "2 Years", fee: "₹45,999", image: "/Course4.png" },
    { id: 5, title: "M.Tech", description: "Advanced engineering, AI systems & research skills.", duration: "2 Years", fee: "₹79,999", image: "/Course5.jpeg" },
    { id: 6, title: "LLB", description: "Law studies, legal systems & courtroom practice.", duration: "3 Years", fee: "₹59,999", image: "/Course6.jpeg" },
    { id: 7, title: "BA", description: "Arts, humanities, communication & social sciences.", duration: "3 Years", fee: "₹29,999", image: "/Course7.jpeg" },
    { id: 8, title: "B.Com", description: "Commerce, accounting, finance & business studies.", duration: "3 Years", fee: "₹34,999", image: "/Course8.jpeg" },
    { id: 9, title: "Diploma in IT", description: "Practical IT skills, networking & development basics.", duration: "2 Years", fee: "₹19,999", image: "/Course9.jpeg" },
    { id: 10, title: "Cyber Security", description: "Ethical hacking, security systems & cyber defense.", duration: "1 Year", fee: "₹24,999", image: "/Course10.jpeg" },
  ];

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