import React from "react";
import "./About.css";
import founderImg from "../../assets/founder.png";
import aboutImg from "../../assets/campus.jpg";
import { FaGraduationCap, FaBullseye, FaEye, FaUniversity, FaBookOpen, FaUsers, FaAward, FaLightbulb, FaHandshake } from "react-icons/fa";

function About() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <span>Welcome to ICFAI University</span>
          <h1>Building Future Leaders Through<br />Quality Education</h1>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="about-intro">
        <div className="about-left"><img src={aboutImg} alt="Campus" /></div>
        <div className="about-right">
          <h5>ABOUT ICFAI UNIVERSITY</h5>
          <h2>Creating Excellence Since 1984</h2>
          <p>

ICFAI was established in 1984 as a not-for-profit society with the broad objective of empowering citizens through world class quality education.

ICFAI launched a high end, innovative professional program in financial analysis in 1985. The Program was first-of-its-kind in India, aimed at equipping students and working professionals with cutting-edge knowledge in contemporary areas of finance.

Since its establishment, ICFAI Group has made a significant mark in the Indian educational field with a pan-Indian network and presence.

Innovation has been the mainstay of ICFAI Group with innovation prevalent in its programs and even its culture.

Subsequently, there was a big leap when ICFAI Group started its chain of business schools (IBS) across India in 1995 to offer management program.

Another example of innovation is the introduction of Case Study methodology at IBS. IBS cases are conceived, developed and produced by Centers of Excellence namely, IBS Case Development Center (IBS-CDC) and IBS Center for Management Research (ICMR). They have won several accolades across the world.

ICFAI Group has 2 Strategic Institutional Units, the ICFAI Universities and the ICFAI Business Schools.
</p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vision-mission">
        <div className="vm-card"><FaEye className="vm-icon"/><h3>Vision</h3><p>To become a globally respected university...</p></div>
        <div className="vm-card"><FaBullseye className="vm-icon"/><h3>Mission</h3><p>To provide quality education through...</p></div>
      </section>

      {/* WHY CHOOSE SECTION - Using the same Grid logic as Courses */}
      <section className="why-section">
        <h2>Why Choose ICFAI?</h2>
        <div className="why-grid">
          {[
            { icon: <FaGraduationCap />, title: "Quality Education" },
            { icon: <FaBookOpen />, title: "Case Study Learning" },
            { icon: <FaUsers />, title: "Experienced Faculty" },
            { icon: <FaUniversity />, title: "Modern Infrastructure" },
            { icon: <FaAward />, title: "Excellent Placements" },
          ].map((item, idx) => (
            <div key={idx} className="why-card">
              {item.icon}
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default About;