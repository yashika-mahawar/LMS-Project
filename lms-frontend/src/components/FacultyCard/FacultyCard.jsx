import React from 'react';
import './FacultyCard.css';

const facultyData = [
  { name: "Dr. A. Sharma", exp: "15+ Years", contact: "+91 98765 43210", email: "asharma@icfai.edu" },
  { name: "Prof. B. Verma", exp: "12+ Years", contact: "+91 98765 43211", email: "bverma@icfai.edu" },
  { name: "Dr. C. Gupta", exp: "10+ Years", contact: "+91 98765 43212", email: "cgupta@icfai.edu" },
  { name: "Prof. D. Singh", exp: "8+ Years", contact: "+91 98765 43213", email: "dsingh@icfai.edu" },
  { name: "Dr. E. Kapoor", exp: "20+ Years", contact: "+91 98765 43214", email: "ekapoor@icfai.edu" },
  { name: "Prof. F. Khan", exp: "11+ Years", contact: "+91 98765 43215", email: "fkhan@icfai.edu" },
  { name: "Dr. G. Reddy", exp: "14+ Years", contact: "+91 98765 43216", email: "greddy@icfai.edu" },
];

const FacultyCard = () => {
  return (
    <section className="faculty-section">
      <h2 className="faculty-title">Meet Our Expert Faculty</h2>
      <div className="faculty-grid">
        {facultyData.map((f, index) => (
          <div key={index} className="faculty-card">
            <h3>{f.name}</h3>
            <p><strong>Exp:</strong> {f.exp}</p>
            <p><strong>Contact:</strong> {f.contact}</p>
            <p><strong>Email:</strong> {f.email}</p>
            {/* Button yahan se remove kar diya hai */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacultyCard;