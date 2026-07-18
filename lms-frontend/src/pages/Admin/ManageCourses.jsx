import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import './AdminDashboard.css';
import AdminHeader from "../../components/AdminHeader/AdminHeader";
const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [tempData, setTempData] = useState({});
  const [showModal, setShowModal] = useState(false);

const [newCourse, setNewCourse] = useState({
  title: "",
    description: "",
  duration: "",
  fee: "",
  image_url: "",
});
useEffect(() => {
  fetchCourses();
}, []);
const fetchCourses = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/admin/courses"
    );

    setCourses(res.data.courses);
    setLoading(false);

  } catch (err) {
    console.log("Fetch Error:", err);
    setLoading(false);
  }
};
  const startEdit = (course) => {
    setEditId(course.id);
    setTempData({ ...course });
  };

  const saveEdit = async () => {
  try {

    await axios.put(
      `http://localhost:5000/api/admin/courses/${editId}`,
      {
        title: tempData.title,
            description: tempData.description,
        duration: tempData.duration,
        fee: tempData.fee,
      }
    );

    setEditId(null);

    fetchCourses();

  } catch (err) {
    console.log(err);
  }
};

  const deleteCourse = async (id) => {

  if (!window.confirm("Delete this course?")) return;

  try {

    await axios.delete(
      `http://localhost:5000/api/admin/courses/${id}`
    );

    fetchCourses();

  } catch (err) {

    console.log(err);

  }

};
const handleAddCourse = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/admin/courses",
      newCourse
    );

    setShowModal(false);

    setNewCourse({
      title: "",
        description: "",
      duration: "",
      fee: "",
      image_url: "",
    });

    fetchCourses();

  } catch (err) {
    console.log("Add Error:", err);
  }
};
const filteredCourses = courses.filter((course) => {
  const search = searchTerm.toLowerCase();

  return (
    course.title?.toLowerCase().includes(search) ||
    course.description?.toLowerCase().includes(search) ||
    course.duration?.toLowerCase().includes(search) ||
    String(course.fee).includes(search)
  );
});
  return (
    <div className="admin-wrapper">
      <div className="sidebar-container"><Sidebar isAdmin={true} /></div>
      
      <main className="admin-main">

  <AdminHeader
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    placeholder="Search courses..."
  />

  <div className="header-box">
  <div>
    <h1>Manage Courses</h1>
    <p>
  Total active programs: <strong>{filteredCourses.length}</strong>
</p>
  </div>

  <button
    className="glow-btn"
    onClick={() => setShowModal(true)}
  >
    + Add Course
  </button>
</div>

        <table className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
                <th>Description</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

  {filteredCourses.length === 0 ? (

    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
        No courses found.
      </td>
    </tr>

  ) : (

    filteredCourses.map((course) => (
      <tr key={course.id}>
        {editId === course.id ? (
          <>
            <td>
              <input
                value={tempData.title}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    title: e.target.value,
                  })
                }
              />
            </td>

            <td>
              <input
                value={tempData.description}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    description: e.target.value,
                  })
                }
              />
            </td>

            <td>
              <input
                value={tempData.duration}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    duration: e.target.value,
                  })
                }
              />
            </td>

            <td>
              <input
                value={tempData.fee}
                onChange={(e) =>
                  setTempData({
                    ...tempData,
                    fee: e.target.value,
                  })
                }
              />
            </td>

            <td>
              <button onClick={saveEdit} className="icon-btn save">
                <FaSave color="green" />
              </button>

              <button
                onClick={() => setEditId(null)}
                className="icon-btn cancel"
              >
                <FaTimes color="gray" />
              </button>
            </td>
          </>
        ) : (
          <>
            <td>{course.title}</td>
            <td>{course.description}</td>
            <td>{course.duration}</td>
            <td>{course.fee}</td>

           <td>

  <div
    className="actions"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    }}
  >

    <button
      onClick={() => startEdit(course)}
      className="icon-btn edit"
    >
      <FaEdit color="#4318ff" />
    </button>


    <button
      onClick={() => deleteCourse(course.id)}
      className="icon-btn trash"
    >
      <FaTrash color="red" />
    </button>

  </div>

</td>
          </>
        )}
      </tr>
    ))

  )}

</tbody>
        </table>
        {showModal && (
  <div className="modal-overlay">
    <div className="course-modal">

      <h2>Add New Course</h2>

      <input
        type="text"
        placeholder="Course Name"
        value={newCourse.title}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            title: e.target.value,
          })
        }
      />
      <input
  type="text"
  placeholder="Course Description"
  value={newCourse.description}
  onChange={(e) =>
    setNewCourse({
      ...newCourse,
      description: e.target.value,
    })
  }
/>

      <input
        type="text"
        placeholder="Duration"
        value={newCourse.duration}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            duration: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Fee"
        value={newCourse.fee}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            fee: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Image URL"
        value={newCourse.image_url}
        onChange={(e) =>
          setNewCourse({
            ...newCourse,
            image_url: e.target.value,
          })
        }
      />

      <div className="modal-buttons">

        <button
          className="glow-btn"
          onClick={handleAddCourse}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}
      </main>
    </div>
  );
};

export default ManageCourses;