import React from 'react';
import './Contact.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-box">
        <div className="contact-left">
          <h2>Get in Touch</h2>
          <p>We are here to assist you with your admissions journey. Feel free to reach out.</p>
          
          <div className="contact-details">
            <div className="contact-item"><FaMapMarkerAlt className="icon" /> <span>Jaipur, Rajasthan</span></div>
            <div className="contact-item"><FaEnvelope className="icon" /> <span>admissions@icfai.edu</span></div>
            <div className="contact-item"><FaPhone className="icon" /> <span>+91 98765 43210</span></div>
          </div>
        </div>
        
        <form className="contact-right">
          <h3>Send us a Message</h3>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Your message..." rows="5" required></textarea>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};
export default Contact;