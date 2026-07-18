import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { FaVideo, FaCalendarAlt, FaClock, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';
import './LiveClass.css';
import axios from "axios";
const LiveClass = () => {
  const [selectedCourse, setSelectedCourse] = useState('All');
const [liveSchedule, setLiveSchedule] = useState([]);
const [enrolledCourses, setEnrolledCourses] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchLiveClasses = async () => {
    try {
      const response = await axios.get(
  "http://localhost:5000/api/live-classes"
);

console.log("Live Classes:", response.data);

const enrolledRes = await axios.get(
  "http://localhost:5000/api/enrollments/my-courses",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

const enrolledTitles = enrolledRes.data.data.map(
  (item) => item.courses.title
);

setEnrolledCourses(enrolledTitles);

const filteredClasses = (response.data.data || []).filter(
  (live) => enrolledTitles.includes(live.courses?.title)
);

setLiveSchedule(filteredClasses);
    } catch (error) {
      console.error("Live class fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchLiveClasses();
}, []);

  const filteredSchedule =
  selectedCourse === "All"
    ? liveSchedule
    : liveSchedule.filter(
        (item) => item.courses?.title === selectedCourse
      );

const getClassStatus = (session) => {
  const now = new Date();

  // date + time ko ek Date object banao
  const classStart = new Date(`${session.date}T${session.time}`);

  // 1 hour duration maan rahe hain
  const classEnd = new Date(classStart.getTime() + 60 * 60 * 1000);

  if (now < classStart) {
    return "Upcoming";
  }

  if (now >= classStart && now <= classEnd) {
    return "Live";
  }

  return "Completed";
};

  // Poore 10 course types short aliases filter navigation list ke liye
const coursePillsList = [
  "All",
  ...enrolledCourses,
];

  return (
    <div className="live-layout-wrapper">
      <aside className="responsive-sidebar">
        <Sidebar />
      </aside>

      <div className="live-main-workspace">
        <Header />

        <main className="live-container">
          
          <div className="live-header-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '20px' }}>
            <div className="live-header-text">
              <h1>Live Lectures Hub</h1>
              <p>Join streaming webinars, interactive workshops, and clear doubts live.</p>
            </div>
            
            {/* 10 COURSE COMPLETE FILTER PILLS */}
            <div className="course-filter-container">
              {coursePillsList.map((course) => (
                <button
                  key={course}
                  onClick={() => setSelectedCourse(course)}
                  className={`filter-pill-btn ${selectedCourse === course ? 'active' : ''}`}
                >
                  {course === 'B.Tech Computer Science' ? 'B.Tech' : course === 'Diploma in IT' ? 'Diploma' : course}
                </button>
              ))}
            </div>
          </div>
             {loading && <h3>Loading Live Classes...</h3>}
          <div className="schedule-cards-list">
  {filteredSchedule.map((session) => {

    const status = getClassStatus(session);

    return (
      <div key={session.id} className="schedule-card-item">
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="course-badge-tag">
 {session.courses?.title}
</span>
                  <h3 className="class-title-text">{session.topic}</h3>
                  <div className="meta-info-row">
                    <FaChalkboardTeacher style={{ color: '#94a3b8' }} /> 
                    <span>Faculty: {session.faculty}</span>
                  </div>
                </div>

                <div className="date-time-box">
                  <div className="meta-info-row" style={{ color: '#334155', fontWeight: '600' }}>
                    <FaCalendarAlt style={{ color: '#4f46e5' }} /> <span>{session.date}</span>
                  </div>
                  <div className="meta-info-row">
  <FaClock style={{ color: '#16a34a' }} /> 
  <span>
    {new Date(`1970-01-01T${session.time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })}
  </span>
</div>
                </div>

                <div className="action-btn-zone">
  {status === "Live" ? (
    <a href={session.meet_link} target="_blank" rel="noreferrer">
      <button className="live-btn-broadcast">
        <FaVideo /> Join Now
      </button>
    </a>
  ) : status === "Upcoming" ? (
    <button disabled className="upcoming-btn-disabled">
      Class Scheduled
    </button>
  ) : (
    <button disabled className="completed-btn-disabled">
      <FaCheckCircle /> Session Concluded
    </button>
  )}
</div>

              </div>
                        );
          })}
          </div>

        </main>
      </div>
    </div>
  );
};

export default LiveClass;