import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/icfailogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {

const [search,setSearch] = useState("");
const navigate = useNavigate();


const handleSearch = (e)=>{

 if(e.key === "Enter"){

   const value = search.toLowerCase();

   if(value.includes("course")){

      navigate("/");
      setTimeout(()=>{
        document.getElementById("courses")?.scrollIntoView({
          behavior:"smooth"
        });
      },100);

   }

   else if(value.includes("faculty")){

      navigate("/");
      setTimeout(()=>{
        document.getElementById("faculty")?.scrollIntoView({
          behavior:"smooth"
        });
      },100);

   }

   else if(value.includes("about")){

      navigate("/about");

   }

 }

};
  return (
    <header className="navbar">
      <div className="logo-section">
        <img src={logo} alt="ICFAI University" />
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
  type="text"
  placeholder="Search..."
  className="search-input"
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  onKeyDown={handleSearch}
/>
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