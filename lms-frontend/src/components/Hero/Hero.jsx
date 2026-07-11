import "./Hero.css";
import heroImage from "../../assets/icfai_image.png";

function Hero() {
  return (
    <section className="hero">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* LEFT SIDE */}
      <div className="hero-left">

        <span className="hero-tag">
          🚀 Learn. Build. Get Placed.
        </span>

        <h1>
         Build Your Future with<br />
          <span>ICFAI University</span>
        </h1>

        <p>
          Join ICFAI University and experience quality education
through expert faculty, modern learning resources,
live classes, and career-focused programs.
        </p>

       
<div className="hero-buttons">
  <a href="#courses" style={{ textDecoration: 'none' }}>
    <button className="secondary-btn">Explore Courses</button>
  </a>
</div>

        <div className="hero-stats">
          <div className="stat">
            <h3>10K+</h3>
            <p>Students</p>
          </div>

          <div className="stat">
            <h3>50+</h3>
            <p>Courses</p>
          </div>

          <div className="stat">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="hero-right">
        <div className="image-wrapper">
          <img src={heroImage} alt="Student Learning" />
        </div>
      </div>

    </section>
  );
}

export default Hero;