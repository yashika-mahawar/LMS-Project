import React, { useState, useEffect } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import './AdminDashboard.css';
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import axios from "axios";
const ManageVideos = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [videos, setVideos] = useState([]);
  const [edit, setEdit] = useState({ courseId: null, moduleIdx: null });
  const [tempUrl, setTempUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

const [editVideoId, setEditVideoId] = useState(null);

const [videoForm, setVideoForm] = useState({
  course_id: "",
  title: "",
  video_url: "",
  duration: "",
  module_number: "",
});
  useEffect(() => {
  fetchCourses();
  fetchVideos();
}, []);

const fetchCourses = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/courses/courses");
    setCourses(res.data.courses);
  } catch (err) {
    console.log(err);
  }
};

const fetchVideos = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/videos");
    setVideos(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const startEdit = (courseId, video) => {
  setEdit({
    courseId,
    moduleIdx: video.id,
  });

  setEditVideoId(video.id);

  setVideoForm({
    course_id: video.course_id,
    title: video.title,
    video_url: video.video_url,
    duration: video.duration,
    module_number: video.module_number,
  });
};
  const saveEdit = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/videos/${editVideoId}`,
      videoForm
    );

    fetchVideos();

    setEditVideoId(null);

    setEdit({
      courseId: null,
      moduleIdx: null,
    });

  } catch (err) {
    console.log(err);
  }
};
const deleteVideo = async (id) => {
  if (!window.confirm("Delete this video?")) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/videos/${id}`
    );

    fetchVideos();

  } catch (err) {
    console.log(err);
  }
};
const handleAddVideo = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/videos",
      videoForm
    );

    fetchVideos();

    setShowModal(false);

    setVideoForm({
      course_id: "",
      title: "",
      video_url: "",
      duration: "",
      module_number: "",
    });

  } catch (err) {
    console.log(err);
  }
};
const visibleCourses = courses.filter((course) => {

  // agar search empty hai to saare courses dikhao
  if (!searchTerm.trim()) return true;

  const search = searchTerm.toLowerCase();

  return videos.some((video) => {

    if (video.course_id !== course.id) return false;

    return (
      String(video.title || "").toLowerCase().includes(search) ||
      String(video.duration || "").toLowerCase().includes(search) ||
      String(video.video_url || "").toLowerCase().includes(search) ||
      String(video.module_number || "").toLowerCase().includes(search)
    );

  });

});
  return (
    <div className="admin-wrapper">
      <div className="sidebar-container"><Sidebar isAdmin={true} /></div>
      <main className="admin-main">
        <AdminHeader
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  placeholder="Search videos..."
/>
        <div className="header-box">
  <div>
    <h1>Manage Videos</h1>
    <p>
      Total Videos: <strong>{videos.length}</strong>
    </p>
  </div>

  <button
    className="glow-btn"
    onClick={() => setShowModal(true)}
  >
    <FaPlus />
    &nbsp; Add Video
  </button>
</div>
        {visibleCourses.map((course) => (
          <div key={course.id} style={{ marginBottom: '40px', background: '#fff', padding: '20px', borderRadius: '15px' }}>
            <h2 style={{ color: "#4318ff", marginBottom: "15px" }}>
  {course.title}
</h2>
            <table className="course-table">
              <thead>
<tr>
  <th>Title</th>
  <th>Video URL</th>
  <th>Duration</th>
  <th>Module</th>
  <th>Actions</th>
</tr>
</thead>

          <tbody>

{videos
.filter((video) => {
  if (video.course_id !== course.id) return false;

  const search = searchTerm.toLowerCase();

return (
  String(video.title || "").toLowerCase().includes(search) ||
  String(video.duration || "").toLowerCase().includes(search) ||
  String(video.video_url || "").toLowerCase().includes(search) ||
  String(video.module_number || "").toLowerCase().includes(search)
);
}).length === 0 ? (

<tr>
  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
    No videos found.
  </td>
</tr>

) : (
videos
.filter((video) => {
  if (video.course_id !== course.id) return false;

  const search = searchTerm.toLowerCase();

  return (
    video.title?.toLowerCase().includes(search) ||
    String(video.duration || "").toLowerCase().includes(search) ||
    video.video_url?.toLowerCase().includes(search) ||
    String(video.module_number).includes(search)
  );
})
.map((video) => (
   
      <tr key={video.id}>
        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.title}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  title: e.target.value,
                })
              }
            />
          ) : (
            video.title
          )}
        </td>

        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.video_url}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  video_url: e.target.value,
                })
              }
            />
          ) : (
            video.video_url
          )}
        </td>

        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.duration}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  duration: e.target.value,
                })
              }
            />
          ) : (
            video.duration
          )}
        </td>

        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.module_number}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  module_number: e.target.value,
                })
              }
            />
          ) : (
            video.module_number
          )}
        </td>
          <td>
  {editVideoId === video.id ? (
    <>
      <button
        className="icon-btn"
        onClick={saveEdit}
      >
        <FaSave color="green" />
      </button>

      <button
        className="icon-btn"
        onClick={() => {
          setEditVideoId(null);
          setEdit({
            courseId: null,
            moduleIdx: null,
          });
        }}
      >
        <FaTimes color="gray" />
      </button>
    </>
  ) : (
    <>
      <button
        className="icon-btn"
        onClick={() => startEdit(course.id, video)}
      >
        <FaEdit color="#4318ff" />
      </button>

      <button
        className="icon-btn"
        onClick={() => deleteVideo(video.id)}
      >
        <FaTrash color="red" />
      </button>
    </>
  )}
</td>
        
            </tr>
    ))
)}
</tbody>
            </table>
          </div>
        ))}
        {showModal && (
  <div className="modal-overlay">
    <div className="course-modal">

      <h2>Add New Video</h2>

      <select
        value={videoForm.course_id}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            course_id: e.target.value,
          })
        }
      >
        <option value="">Select Course</option>

        {visibleCourses.map((course) => (
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
        placeholder="Video Title"
        value={videoForm.title}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            title: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Video URL"
        value={videoForm.video_url}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            video_url: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Duration"
        value={videoForm.duration}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            duration: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Module Number"
        value={videoForm.module_number}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            module_number: e.target.value,
          })
        }
      />

      <div className="modal-buttons">

        <button
          className="glow-btn"
          onClick={handleAddVideo}
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

export default ManageVideos;