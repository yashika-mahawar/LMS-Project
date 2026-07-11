import React from 'react';
import './Admissions.css';

function Admission() {
  return (
    <div className="admission-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Admissions Open 2026-27</h1>
          <p>ICFAI University: Excellence in Education and Innovation.</p>
        </div>
      </section>

      {/* Admission Details & Process Section */}
      <section className="admission-content">
        <div className="info-card">
          <h3>Admission Process 2026-27</h3>
          <ol className="process-list">
            <li><strong>Online Registration:</strong> Fill out the inquiry form available on our official portal.</li>
            <li><strong>Counseling Session:</strong> Speak with our academic counselors to understand the program structure.</li>
            <li><strong>Entrance/Merit Evaluation:</strong> Admission is granted based on merit or specific entrance test scores.</li>
            <li><strong>Document Verification:</strong> Submit required academic and identity documents for validation.</li>
            <li><strong>Fee Payment & Enrollment:</strong> Complete the initial fee payment to confirm your seat.</li>
          </ol>
        </div>

        <div className="info-card">
          <h3>Required Documents</h3>
          <ul className="doc-list">
            <li>Class 10th and 12th Marksheets</li>
            <li>School/College Transfer Certificate (TC)</li>
            <li>Recent Passport Size Photographs</li>
            <li>Proof of Identity (e.g., [Aadhaar Redacted] or other valid ID)</li>
          </ul>
        </div>
      </section>

      {/* Admission Calendar */}
      <section className="calendar-section">
        <h2 className="section-title">Important Dates</h2>
        <div className="calendar-grid">
          <div className="calendar-item">
            <h4>Application Start</h4>
            <p>February 15, 2026</p>
          </div>
          <div className="calendar-item">
            <h4>Entrance Window</h4>
            <p>April - May 2026</p>
          </div>
          <div className="calendar-item">
            <h4>Merit Announcement</h4>
            <p>June 2026</p>
          </div>
          <div className="calendar-item">
            <h4>Session Commencement</h4>
            <p>July 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admission;