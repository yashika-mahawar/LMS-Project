import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookReader, FaClock } from "react-icons/fa";
import "./MyCourses.css";
// MyCourses.jsx ke upar
import axios from 'axios'; 
import API from "../../services/api";
// ... useEffect ke andar
const fetchEnrolledCourses = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/enrollments/my-courses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});
    console.log("Backend se aaya data:", response.data); // Yeh check karo
    setMyEnrolledCourses(response.data.data || []);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};
function MyCourses() {
  const [myEnrolledCourses, setMyEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
const [progressMap, setProgressMap] = useState({});
  // MyCourses.jsx
// --- YAHAN FIX HAI ---
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("Backend Response:", response.data);

      if (response.data && response.data.data) {
        // Galti yahan thi: tum 'setEnrolledCourses' use kar rahi thi
        // Lekin tumhara state variable 'myEnrolledCourses' hai!
        setMyEnrolledCourses(response.data.data); 
        const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const progressRes = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/progress/user/${user.id}`
);

  const map = {};

  progressRes.data.courses.forEach((course) => {
    map[course.courseId] = course;
  });

  setProgressMap(map);
}
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);


  return (
    <div className="my-courses-wrapper">
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "800",
          marginBottom: "25px",
        }}
      >
        My Enrolled Courses
      </h1>

      {loading ? (
            <h3>Loading...</h3>
          ) : myEnrolledCourses.length === 0 ? (
            <h3>No courses enrolled yet!</h3>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                gap: "20px",
              }}
            >
              {myEnrolledCourses.map((item) => {
                const course = item.courses;
                 const progress = progressMap[course.id];
                if (!course) return null;

                const imagePath =
  !course.image_url
    ? "/Course1.jpg"
    : course.image_url.startsWith("http")
    ? course.image_url
    : course.image_url.startsWith("/")
    ? course.image_url
    : `/${course.image_url}`;

                return (
                  <div
                    key={item.id}
                    className="course-card"
                    style={{
                      background: "#fff",
                      borderRadius: "15px",
                      overflow: "hidden",
                      border: "1px solid #ddd",
                    }}
                  >
                    <img
                      src={imagePath}
                      alt={course.title}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />

                    <div style={{ padding: "20px" }}>
                      <h3>{course.title}</h3>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#666",
                        }}
                      >
                        <FaClock />
                        <span>{course.duration || "Self Paced"}</span>
                      </div>
                      <div style={{ marginTop: "15px" }}>
  <div
    style={{
      width: "100%",
      height: "8px",
      background: "#e5e7eb",
      borderRadius: "999px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${progress?.progress || 0}%`,
        height: "100%",
        background: "#22c55e",
      }}
    />
  </div>

  <p
    style={{
      marginTop: "8px",
      fontSize: "14px",
      color: "#64748b",
    }}
  >
    {progress?.completedVideos || 0} / {progress?.totalVideos || 0} Videos
  </p>

  <strong>{progress?.progress || 0}% Complete</strong>
</div>

                      <Link
                        to={`/learning/${course.id}`}
                        state={{ course }}
                      >
                        <button
                          style={{
                            marginTop: "15px",
                            width: "100%",
                            padding: "10px",
                            background: "#4f46e5",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          <FaBookReader /> Continue Learning
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
    </div>
  );
}

export default MyCourses;