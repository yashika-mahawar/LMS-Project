import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // sirf zaroori cheezein
import ReactPlayer from "react-player";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { FaPlayCircle, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import "./Learning.css";

const Learning = () => {
  const { id } = useParams(); // URL se ID lene ke liye ye best hai
  
  const [modules, setModules] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // ... baaki code same rahega
  // 1. Database se videos fetch karo
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setModules(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setLoading(false);
      }
    };
    fetchVideos();
  }, [id]);

  // 2. Last visited module load karo
  useEffect(() => {
    const savedModule = localStorage.getItem(`lastModule_${id}`);
    if (savedModule !== null) {
      setActiveIdx(parseInt(savedModule));
    }
  }, [id]);

  // 3. Current active module save karo
  useEffect(() => {
    if (activeIdx !== null) {
      localStorage.setItem(`lastModule_${id}`, activeIdx);
    }
  }, [activeIdx, id]);

  const handleVideoEnd = () => {
    if (activeIdx < modules.length - 1) setActiveIdx((prev) => prev + 1);
  };

  // Safe Rendering Check
  if (loading) return <div>Loading course content...</div>;
  if (!modules || modules.length === 0)
    return <div>No videos found for this course.</div>;

  const currentModule = modules[activeIdx];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <aside
        style={{
          width: "260px",
          minWidth: "260px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Sidebar />
      </aside>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main
          style={{
            padding: "32px",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Link
            to="/my-courses"
            style={{
              color: "#4f46e5",
              textDecoration: "none",
              fontWeight: "600",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaArrowLeft /> Back to Courses
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "28px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="video-container">
                <div className="player-wrapper">
                  <div className="video-box">
                    <ReactPlayer
                      url={currentModule.url}
                      width="100%"
                      height="100%"
                      controls
                      playing
                      onEnded={handleVideoEnd}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h2 style={{ margin: 0 }}>{currentModule.title}</h2>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                padding: "20px",
                height: "fit-content",
              }}
            >
              <h3 style={{ margin: "0 0 16px 0" }}>Course Syllabus</h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {modules.map((module, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: activeIdx === idx ? "#f5f3ff" : "#fff",
                      border:
                        activeIdx === idx
                          ? "1px solid #4f46e5"
                          : "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {activeIdx === idx ? (
                      <FaPlayCircle color="#4f46e5" />
                    ) : (
                      <FaCheckCircle color="#94a3b8" />
                    )}
                    <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                      {module.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Learning;
