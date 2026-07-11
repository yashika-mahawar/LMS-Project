import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './AdminDashboard.css';

const ManageVideos = () => {
  const [courses, setCourses] = useState({
    1: { name: "B.Tech Computer Science", modules: [
      { title: "Intro to Cloud", url: "https://youtu.be/8C_kHJ5YEiA" },
      { title: "Data Structures", url: "https://www.youtube.com/watch?v=bum_19loj9A" },
      { title: "Algorithms", url: "https://www.youtube.com/watch?v=0IAPZzGSbME" },
      { title: "DB Indexing", url: "https://youtu.be/BHCSL_ZifI0" },
      { title: "Operating Systems", url: "https://www.youtube.com/watch?v=mXw9ruZaxzQ" },
      { title: "Networking", url: "https://youtu.be/SHkbPm1Wrno" },
      { title: "Software Eng", url: "https://www.youtube.com/watch?v=kcvEiMFOcoE" },
      { title: "AI & ML", url: "https://www.youtube.com/watch?v=JcI5Vnw0b2c" },
      { title: "DBMS", url: "https://www.youtube.com/watch?v=KWkm1Gip4j4" },
      { title: "Final Project", url: "https://www.youtube.com/watch?v=J11Qme3vAio" }
    ]},
    2: { name: "MBA", modules: [
      { title: "Financial Management", url: "https://www.youtube.com/watch?v=WNm_ez1h7Tc" },
      { title: "Marketing Management", url: "https://www.youtube.com/watch?v=OUxmwxA66Ss" },
      { title: "Organizational Behavior", url: "https://www.youtube.com/watch?v=c2R1TN8uqTE" },
      { title: "Supply Chain Management", url: "https://www.youtube.com/watch?v=Mi1QBxVjZAw" },
      { title: "Business Analytics", url: "https://www.youtube.com/watch?v=9fFQA-JOXA0" },
      { title: "HR Management", url: "https://www.youtube.com/watch?v=bI9RZjF-538" },
      { title: "Managerial Economics", url: "https://www.youtube.com/watch?v=huNItcg4-bA" },
      { title: "Strategic Management", url: "https://www.youtube.com/watch?v=CMMUwNeBxyA" },
      { title: "Entrepreneurship", url: "https://www.youtube.com/watch?v=pC5l5j2u9SQ" },
      { title: "Business Case Study", url: "https://www.youtube.com/watch?v=Q9r0rC00Kyw" }
    ]},
    3: { name: "BCA", modules: [
      { title: "Web Architecture", url: "https://www.youtube.com/watch?v=916GWv2Qs08" },
      { title: "Java OOP", url: "https://www.youtube.com/watch?v=UmnCZ7-9yDY" },
      { title: "DBMS Basics", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
      { title: "UI/UX Design", url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU" },
      { title: "Python Basics", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc" },
      { title: "Node.js Introduction", url: "https://www.youtube.com/watch?v=TlB_eWDSMt4" },
      { title: "React Frontend", url: "https://www.youtube.com/watch?v=bMknfKXIFA8" },
      { title: "Express.js Backend", url: "https://www.youtube.com/watch?v=L72fhGm1tfE" },
      { title: "REST API", url: "https://www.youtube.com/watch?v=-MTSQjw5DrM" },
      { title: "Mini Project", url: "https://www.youtube.com/watch?v=7CqJlxBYj-M" }
    ]},
    4: { name: "MCA", modules: [
        { title: "Neural Networks", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
        { title: "Deep Learning", url: "https://www.youtube.com/watch?v=d2kxUVwWWwU" },
        { title: "Cloud Microservices", url: "https://www.youtube.com/watch?v=7IFJb-uLEaI" },
        { title: "Distributed Systems", url: "https://www.youtube.com/watch?v=o0o4PUhtC0s" },
        { title: "Enterprise Software", url: "https://www.youtube.com/watch?v=QfcqaWyNUU8" },
        { title: "Data Mining", url: "https://www.youtube.com/watch?v=7rs0i-9nOjo" },
        { title: "Big Data Analytics", url: "https://www.youtube.com/watch?v=bY6ZzQmtOzk" },
        { title: "Blockchain Tech", url: "https://www.youtube.com/watch?v=CxlLvVZ84qs" },
        { title: "Advanced OS", url: "https://www.youtube.com/watch?v=ejv9OTfF1qI" },
        { title: "Thesis Work", url: "https://www.youtube.com/watch?v=QNOr8km3-us" }
    ]},
    5: { name: "M.Tech", modules: [
        { title: "Research Methods", url: "https://www.youtube.com/watch?v=K80p4u-e3pA" },
        { title: "NLP Systems", url: "https://www.youtube.com/watch?v=CMrHM8a3hqw" },
        { title: "Signal Processing", url: "https://www.youtube.com/watch?v=D-aV53gE9_o" },
        { title: "Quantum Computing", url: "https://www.youtube.com/watch?v=JhZ363412u0" },
        { title: "Advanced Robotics", url: "https://www.youtube.com/watch?v=Q403yL7_X1o" },
        { title: "Computer Vision", url: "https://www.youtube.com/watch?v=u6zlqFFnwlA" },
        { title: "IoT Frameworks", url: "https://www.youtube.com/watch?v=QSIPNhOiMoE" },
        { title: "High Performance", url: "https://www.youtube.com/watch?v=9jR7uM7Z-7k" },
        { title: "Cryptography", url: "https://www.youtube.com/watch?v=jhXCTbvnx28" },
        { title: "Research Paper", url: "https://www.youtube.com/watch?v=333-eW1-22o" }
    ]},
    6: { name: "LLB", modules: [
      { title: "Constitutional Law", url: "https://www.youtube.com/watch?v=UTaik7YkfUo" },
      { title: "Corporate Law", url: "https://www.youtube.com/watch?v=gJ1r2W5nOSU" },
      { title: "CrPC", url: "https://www.youtube.com/watch?v=NrfMSz0pEOk" },
      { title: "IPR", url: "https://www.youtube.com/watch?v=zkWJAvg6_ME" },
      { title: "Family Law", url: "https://www.youtube.com/watch?v=KIL8WDgvyFA" },
      { title: "Law of Torts", url: "https://www.youtube.com/watch?v=5Wpx38EuKW0" },
      { title: "Evidence Act", url: "https://www.youtube.com/watch?v=RxUFI4VZXLw" },
      { title: "Administrative Law", url: "https://www.youtube.com/watch?v=7TtY3Zn5-L4" },
      { title: "Cyber Law", url: "https://www.youtube.com/watch?v=KtuCsBlJXk8" },
      { title: "Moot Court", url: "https://www.youtube.com/watch?v=ls0iQJWpSEQ" }
    ]},
    7: { name: "BA", modules: [
      { title: "Macro Economics", url: "https://www.youtube.com/watch?v=xmdBlkrkTN4" },
      { title: "Sociological Thought", url: "https://www.youtube.com/watch?v=YnCJU6PaCio" },
      { title: "English Literature", url: "https://www.youtube.com/watch?v=8oLnPJQ9Shw" },
      { title: "Political History", url: "https://www.youtube.com/watch?v=4CsJPrHcaBs" },
      { title: "Philosophy Basics", url: "https://www.youtube.com/watch?v=1A_CAkYt3GY" },
      { title: "Public Admin", url: "https://www.youtube.com/watch?v=kOy25Q8Y_Gg" },
      { title: "Intl Relations", url: "https://www.youtube.com/watch?v=22IQzShFZlE" },
      { title: "Human Rights", url: "https://www.youtube.com/watch?v=6e8m8L9BFa4" },
      { title: "Psychology", url: "https://www.youtube.com/watch?v=vo4pMVb0R6M" },
      { title: "Cultural Studies", url: "https://www.youtube.com/watch?v=SRc9EOacYZw" }
    ]},
    8: { name: "B.Com", modules: [
      { title: "Corporate Accounting", url: "https://www.youtube.com/watch?v=jlZW5_ZesOQ" },
      { title: "Auditing", url: "https://www.youtube.com/watch?v=y3Tu-v_uHdk" },
      { title: "GST Laws", url: "https://www.youtube.com/watch?v=E8jlj2lcCgc" },
      { title: "Direct Taxation", url: "https://www.youtube.com/watch?v=XV8eh9ISXSM" },
      { title: "Mercantile Law", url: "https://www.youtube.com/watch?v=7yPadF_J4R0" },
      { title: "Cost Accounting", url: "https://www.youtube.com/watch?v=3g4OyeB7kwM" },
      { title: "Financial Markets", url: "https://www.youtube.com/watch?v=9em8H1p6Syw" },
      { title: "Business Math", url: "https://www.youtube.com/watch?v=vtrbOri8lag" },
      { title: "Banking Law", url: "https://www.youtube.com/watch?v=ImYAOv-DREU" },
      { title: "Corporate Finance", url: "https://www.youtube.com/watch?v=VYvOlggk0e4" }
    ]},
    9: { name: "Diploma in IT", modules: [
      { title: "PC Hardware", url: "https://www.youtube.com/watch?v=d86ws7mQYIg" },
      { title: "LAN Networking", url: "https://www.youtube.com/watch?v=n0iaPtsnmxQ" },
      { title: "C++", url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y" },
      { title: "HTML/CSS", url: "https://www.youtube.com/watch?v=pQN-pnXPaVg" },
      { title: "Linux Admin", url: "https://www.youtube.com/watch?v=A3G-3hp88mo" },
      { title: "IT Security", url: "https://www.youtube.com/watch?v=OwuX-dRylhU" },
      { title: "Database Intro", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
      { title: "System Analysis", url: "https://www.youtube.com/watch?v=rK0xSNQeHnU" },
      { title: "AI & ML", url: "https://www.youtube.com/watch?v=JcI5Vnw0b2c" },
      { title: "Final Project", url: "https://www.youtube.com/watch?v=J11Qme3vAio" }
    ]},
    10: { name: "Cyber Security", modules: [
      { title: "Ethical Hacking", url: "https://www.youtube.com/watch?v=p475WJvAK6o" },
      { title: "Intrusion Prevention", url: "https://www.youtube.com/watch?v=7QuYupuic3Q" },
      { title: "Digital Forensics", url: "https://www.youtube.com/watch?v=vD7uJ8aP0zA" },
      { title: "Malware Analysis", url: "https://www.youtube.com/watch?v=-cIxKeJp4xo" },
      { title: "Network Security", url: "https://www.youtube.com/watch?v=o_vyfo3Hw0Y" },
      { title: "Cloud Security", url: "https://www.youtube.com/watch?v=Qt9lhzFhW_c" },
      { title: "Penetration Testing", url: "https://www.youtube.com/watch?v=CMer2DhA0s0" },
      { title: "Security Policy", url: "https://www.youtube.com/watch?v=mqwPa-fghp8" },
      { title: "Incident Response", url: "https://www.youtube.com/watch?v=X4lPEpATNxg" },
      { title: "Compliance Audit", url: "https://www.youtube.com/watch?v=E6mD4e1hG-c" }
    ]}
  });

  const [edit, setEdit] = useState({ courseId: null, moduleIdx: null });
  const [tempUrl, setTempUrl] = useState("");

  const startEdit = (cId, mIdx, url) => {
    setEdit({ courseId: cId, moduleIdx: mIdx });
    setTempUrl(url);
  };

  const saveEdit = (cId, mIdx) => {
    const updated = { ...courses };
    updated[cId].modules[mIdx].url = tempUrl;
    setCourses(updated);
    setEdit({ courseId: null, moduleIdx: null });
  };

  return (
    <div className="admin-wrapper">
      <div className="sidebar-container"><Sidebar isAdmin={true} /></div>
      <main className="admin-main">
        <h1>Manage Course Videos</h1>
        {Object.entries(courses).map(([cId, course]) => (
          <div key={cId} style={{ marginBottom: '40px', background: '#fff', padding: '20px', borderRadius: '15px' }}>
            <h2 style={{ color: '#4318ff', marginBottom: '15px' }}>{course.name}</h2>
            <table className="course-table">
              <thead><tr><th>Module</th><th>Video URL</th><th>Actions</th></tr></thead>
              <tbody>
                {course.modules.map((mod, idx) => (
                  <tr key={idx}>
                    <td>{mod.title}</td>
                    <td>
                      {edit.courseId === cId && edit.moduleIdx === idx ? (
                        <input value={tempUrl} onChange={(e) => setTempUrl(e.target.value)} style={{ width: '100%', padding: '5px' }} />
                      ) : (
                        <a href={mod.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem' }}>{mod.url}</a>
                      )}
                    </td>
                    <td>
                      {edit.courseId === cId && edit.moduleIdx === idx ? (
                        <>
                          <button onClick={() => saveEdit(cId, idx)} className="icon-btn"><FaSave color="green" /></button>
                          <button onClick={() => setEdit({ courseId: null, moduleIdx: null })} className="icon-btn"><FaTimes color="gray" /></button>
                        </>
                      ) : (
                        <button onClick={() => startEdit(cId, idx, mod.url)} className="icon-btn"><FaEdit color="#4318ff" /></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ManageVideos;