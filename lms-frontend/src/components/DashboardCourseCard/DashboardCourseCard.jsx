import "./DashboardCourseCard.css";

import Course1 from "../../assets/Course1.jpg";
import Course2 from "../../assets/Course2.jpg";
import Course3 from "../../assets/Course3.jpeg";
import Course4 from "../../assets/Course4.png";

function DashboardCourseCard() {
  const courses = [
    {
      id: 1,
      title: "Web Development",
      instructor: "Dr. Rahul Sharma",
      image: Course1,
      progress: 80,
    },
    {
      id: 2,
      title: "React JS",
      instructor: "Prof. Anjali Mehta",
      image: Course2,
      progress: 65,
    },
    {
      id: 3,
      title: "Java Programming",
      instructor: "Dr. Amit Verma",
      image: Course3,
      progress: 50,
    },
    {
      id: 4,
      title: "Database Management",
      instructor: "Prof. Neha Gupta",
      image: Course4,
      progress: 90,
    },
  ];

  return (
    <div className="dashboard-course-grid">
      {courses.map((course) => (
        <div className="dashboard-course-card" key={course.id}>
          <img src={course.image} alt={course.title} />

          <div className="dashboard-course-content">
            <h3>{course.title}</h3>

            <p>{course.instructor}</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>

            <span>{course.progress}% Completed</span>

            <button>Continue Learning</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCourseCard;