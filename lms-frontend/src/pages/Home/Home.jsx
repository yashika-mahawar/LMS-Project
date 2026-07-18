import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CourseCard from "../../components/CourseCard/CourseCard";
import FacultyCard from "../../components/FacultyCard/FacultyCard";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CourseCard />
      <div id="faculty">
   <FacultyCard />
</div>
      <Footer />
    </>
  );
}

export default Home;