import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { FaBookReader, FaClock } from "react-icons/fa";
import { getMyCourses } from "../../services/courseService";
import "./MyCourses.css";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);
const loadCourses = async () => {
  try {
    const data = await getMyCourses();
    console.log("Backend se kya data aaya:", data); // Isse F12 mein dekho
    setCourses(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: 30 }}>
          <h1>My Enrolled Courses</h1>
          {courses.length === 0 ? (
            <h3>No Course Enrolled</h3>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 25, marginTop: 30 }}>
              {courses.map((item) => {
                const course = item.courses;
                return (
                  <div key={item.id} style={{ background: "#fff", borderRadius: 15, overflow: "hidden", boxShadow: "0 5px 15px rgba(0,0,0,.08)" }}>
                    {/* YAHAN PATH FIX KIYA HAI: Add '/' before the image_url */}
                    <img
                      src={`/${course.image_url}`}
                      alt={course.title}
                      onError={(e) => { e.target.src = '/Course1.jpg'; }} // Default image agar error aaye
                      style={{ width: "100%", height: 180, objectFit: "cover" }}
                    />
                    <div style={{ padding: 20 }}>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#666", margin: "10px 0" }}>
                        <FaClock /> {course.duration}
                      </div>
                      <div style={{ marginBottom: 15 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Progress</span>
                          <span>0%</span>
                        </div>
                        <div style={{ height: 8, background: "#ddd", borderRadius: 10, marginTop: 5 }}>
                          <div style={{ width: "0%", height: "100%", background: "#4f46e5", borderRadius: 10 }} />
                        </div>
                      </div>
                      <Link to={`/learning/${course.id}`} state={{ course }}>
                        <button style={{ width: "100%", padding: 12, background: "#4f46e5", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}>
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
      </div>
    </div>
  );
}

export default MyCourses;