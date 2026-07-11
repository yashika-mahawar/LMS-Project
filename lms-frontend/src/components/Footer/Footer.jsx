import "./Footer.css";
import { FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Icons add kiye
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h2>ICFAI University</h2>
          <p>
            Empowering students with quality education, innovation,
            and excellence. Learn anytime, anywhere with our
            modern e-learning platform.
          </p>
          {/* Instagram Icon here */}
          <a href="https://www.instagram.com/your-account-handle" target="_blank" rel="noreferrer" style={{ color: '#fff', fontSize: '1.5rem' }}>
            <FaInstagram />
          </a>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
<li><Link to="/#courses">Courses</Link></li>
<li><Link to="/about">About Us</Link></li>
<li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p><FaMapMarkerAlt /> Located near Cambay Golf Resort on Agra Road in Jamdoli, Jaipur, Rajasthan (Pin: 302031). </p>
          <p><FaEnvelope /> admissions@icfaiuniversity.edu</p>
          <p><FaPhone /> +91 98765 43210</p>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2026 ICFAI University. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;