import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { FaVideo, FaCalendarAlt, FaClock, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';
import './LiveClass.css';

const LiveClass = () => {
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Poore 10 different courses ko adjust karke dummy active schedules system set kiya
  const liveSchedule = [
    { id: 1, course: "B.Tech Computer Science", topic: "AWS Serverless Scaling Engines Architecture", faculty: "Dr. Arvinder Singh", date: "Today", time: "12:00 PM - 01:30 PM", status: "Live", meetLink: "https://meet.google.com/abc" },
    { id: 2, course: "MBA", topic: "Global Brand Management Strategy", faculty: "Prof. Meenakshi Iyer", date: "Today", time: "03:00 PM - 04:30 PM", status: "Upcoming", meetLink: "https://meet.google.com/def" },
    { id: 3, course: "BCA", topic: "Complex SQL Join Optimization Algorithms", faculty: "Prof. Priya Sharma", date: "Tomorrow", time: "10:00 AM - 11:30 AM", status: "Upcoming", meetLink: "https://meet.google.com/ghi" },
    { id: 4, course: "MCA", topic: "Deep Learning Tensor Convolution Matrix", faculty: "Dr. Rajesh Verma", date: "Yesterday", time: "11:00 AM - 12:30 PM", status: "Completed", meetLink: "#" },
    { id: 5, course: "M.Tech", topic: "Quantum Encryption Security Standards", faculty: "Dr. Hiten Patel", date: "Today", time: "04:00 PM - 05:30 PM", status: "Upcoming", meetLink: "https://meet.google.com/jkl" },
    { id: 6, course: "LLB", topic: "Constitutional Writs & Civil Jurisdictions", faculty: "Advocate Suresh Das", date: "Tomorrow", time: "01:00 PM - 02:30 PM", status: "Upcoming", meetLink: "https://meet.google.com/mno" },
    { id: 7, course: "BA", topic: "Socio-Economic Impacts of Industrialization", faculty: "Dr. Kavita Murthy", date: "Today", time: "11:30 AM - 01:00 PM", status: "Live", meetLink: "https://meet.google.com/pqr" },
    { id: 8, course: "B.Com", topic: "Corporate Tax Deductions & Auditing Audit Laws", faculty: "CA Rakesh Singhal", date: "Yesterday", time: "09:00 AM - 10:30 AM", status: "Completed", meetLink: "#" },
    { id: 9, course: "Diploma in IT", topic: "Local Switch Custom Configurations Basics", faculty: "Prof. Anil Dhawan", date: "Today", time: "02:00 PM - 03:30 PM", status: "Upcoming", meetLink: "https://meet.google.com/stu" },
    { id: 10, course: "Cyber Security", topic: "Social Engineering Exploitations and Firewalls", faculty: "Prof. Nitin Kumar", date: "Tomorrow", time: "05:00 PM - 06:30 PM", status: "Upcoming", meetLink: "https://meet.google.com/vwx" }
  ];

  const filteredSchedule = selectedCourse === 'All' 
    ? liveSchedule 
    : liveSchedule.filter(item => item.course === selectedCourse);

  // Poore 10 course types short aliases filter navigation list ke liye
  const coursePillsList = ['All', 'B.Tech Computer Science', 'MBA', 'BCA', 'MCA', 'M.Tech', 'LLB', 'BA', 'B.Com', 'Diploma in IT', 'Cyber Security'];

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

          <div className="schedule-cards-list">
            {filteredSchedule.map((session) => (
              <div key={session.id} className="schedule-card-item">
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="course-badge-tag">{session.course}</span>
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
                    <FaClock style={{ color: '#16a34a' }} /> <span>{session.time}</span>
                  </div>
                </div>

                <div className="action-btn-zone">
                  {session.status === 'Live' ? (
                    <a href={session.meetLink} target="_blank" rel="noreferrer">
                      <button className="live-btn-broadcast">
                        <FaVideo /> Join Broadcast Now
                      </button>
                    </a>
                  ) : session.status === 'Upcoming' ? (
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
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};

export default LiveClass;