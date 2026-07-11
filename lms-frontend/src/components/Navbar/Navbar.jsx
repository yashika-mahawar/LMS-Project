import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/icfailogo.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo-section">
        <img src={logo} alt="ICFAI University" />
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

     <nav>
        <ul className="nav-links">
          {/* Internal section links */}
          <li><a href="#home">Home</a></li>
          <li><a href="#courses">Courses</a></li>
          
          {/* New Page links (using Link component) */}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/admissions">Admissions</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
        

      <div className="nav-buttons">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="register-btn">Register</Link>
      </div>
      
    </header>
  );
}

export default Navbar;