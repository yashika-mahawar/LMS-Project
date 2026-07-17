
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "./AdminDashboard.css";
const AdminLiveClasses = () => {
const [liveClasses, setLiveClasses] = useState([]);
const [editingId, setEditingId] = useState(null);
const [courses, setCourses] = useState([]);
const [showModal, setShowModal] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

const [liveForm, setLiveForm] = useState({
  topic: "",
  faculty: "",
  date: "",
  time: "",
  meet_link: "",
  course_id: "",
});

useEffect(() => {
  fetchCourses();
  fetchLiveClasses();
}, []);

const fetchCourses = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/courses/courses");
    setCourses(res.data.courses);
  } catch (err) {
    console.log(err);
  }
};

const fetchLiveClasses = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/live-classes");
    setLiveClasses(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

const handleSaveLiveClass = async () => {
  try {

    if (editingId) {

      await axios.put(
        `http://localhost:5000/api/live-classes/${editingId}`,
        liveForm
      );

    } else {

      await axios.post(
        "http://localhost:5000/api/live-classes",
        liveForm
      );

    }

    fetchLiveClasses();

    setEditingId(null);

    setShowModal(false);

    setLiveForm({
      topic: "",
      faculty: "",
      date: "",
      time: "",
      meet_link: "",
      course_id: "",
    });

  } catch (err) {
    console.log(err);
  }
};
const handleEdit = (item) => {
  setEditingId(item.id);

  setLiveForm({
    topic: item.topic,
    faculty: item.faculty,
    date: item.date,
    time: item.time,
    meet_link: item.meet_link,
    course_id: item.course_id,
  });

  setShowModal(true);
};
const handleDelete = async (id) => {

  if (!window.confirm("Delete this Live Class?")) return;

  try {

    await axios.delete(
      `http://localhost:5000/api/live-classes/${id}`
    );

    fetchLiveClasses();

  } catch (err) {
    console.log(err);
  }
};
return (
  <div className="admin-wrapper">

    <div className="sidebar-container">
      <Sidebar isAdmin={true} />
    </div>

    <main className="admin-main">

      <AdminHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search Live Classes..."
      />

      <div className="header-box">

        <div>
          <h1>Manage Live Classes</h1>
          <p>
            Total Live Classes:
            <strong> {liveClasses.length}</strong>
          </p>
        </div>

        <button
          className="glow-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          &nbsp; Add Live Class
        </button>

      </div>

      <table className="course-table">

        <thead>
  <tr>
    <th>Topic</th>
    <th>Faculty</th>
    <th>Course</th>
    <th>Date</th>
    <th>Time</th>
    <th>Actions</th>
  </tr>
</thead>

<tbody>
  {liveClasses.map((item) => (
    <tr key={item.id}>
      <td>{item.topic}</td>
      <td>{item.faculty}</td>
      <td>{item.courses?.title}</td>
      <td>{item.date}</td>
      <td>
  {new Date(`1970-01-01T${item.time}`)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })}
</td>

      <td className="action-buttons">

        <button
          className="edit-btn"
          onClick={() => handleEdit(item)}
        >
          <FaEdit /> 
        </button>

        <button
          className="delete-btn"
          onClick={() => handleDelete(item.id)}
        >
          <FaTrash /> 
        </button>

      </td>

    </tr>
  ))}
</tbody>

      </table>

      {showModal && (

        <div className="modal-overlay">

          <div className="course-modal">

            <h2>Add Live Class</h2>

            <select
              value={liveForm.course_id}
              onChange={(e) =>
                setLiveForm({
                  ...liveForm,
                  course_id: e.target.value,
                })
              }
            >
              <option value="">Select Course</option>

              {courses.map((course) => (

                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.title}
                </option>

              ))}

            </select>

            <input
              type="text"
              placeholder="Topic"
              value={liveForm.topic}
              onChange={(e) =>
                setLiveForm({
                  ...liveForm,
                  topic: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Faculty"
              value={liveForm.faculty}
              onChange={(e) =>
                setLiveForm({
                  ...liveForm,
                  faculty: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={liveForm.date}
              onChange={(e) =>
                setLiveForm({
                  ...liveForm,
                  date: e.target.value,
                })
              }
            />

            <input
              type="time"
              value={liveForm.time}
              onChange={(e) =>
                setLiveForm({
                  ...liveForm,
                  time: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Google Meet Link"
              value={liveForm.meet_link}
              onChange={(e) =>
                setLiveForm({
                  ...liveForm,
                  meet_link: e.target.value,
                })
              }
            />

            <div className="modal-buttons">

             <button
  className="glow-btn"
  onClick={handleSaveLiveClass}
>
  {editingId ? "Update" : "Save"}
</button>

              <button
                className="cancel-btn"
                onClick={() => {
  setEditingId(null);

  setLiveForm({
    topic: "",
    faculty: "",
    date: "",
    time: "",
    meet_link: "",
    course_id: "",
  });

  setShowModal(true);
}}
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

export default AdminLiveClasses;