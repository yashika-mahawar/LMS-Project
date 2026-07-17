import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminHeader({
  searchTerm = "",
  setSearchTerm,
}) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
useEffect(() => {

  const fetchNotifications = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/notifications"
      );

      setNotifications(res.data.notifications);

    } catch(error){

      console.log("Notification Error:", error);

    }

  };

  fetchNotifications();

}, []);
  const admin = {
    name: "Administrator",
    email: "admin@icfai.com",
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">

      <div className="admin-search">

        <FaSearch />

        <input
  type="text"
  placeholder="Search students..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm && setSearchTerm(e.target.value)
  }
/>

      </div>

      <div className="admin-right">

        {/* Notification */}

        <div className="admin-notification">

          <button
            className="header-btn"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            <FaBell />

            <span className="notify-dot"></span>

          </button>

          {showNotifications && (

<div className="notification-box">

<h4>Notifications</h4>


{
notifications.length === 0 ? (

<p>No new notifications</p>

)

:

(

notifications.map((item)=>(
<div key={item.id} className="notification-item">

<p>
{item.message}
</p>

<small>
{new Date(item.created_at).toLocaleDateString()}
</small>

</div>
))

)

}

</div>

)}

        </div>

        {/* Profile */}

        <div className="admin-profile">

          <button
            className="profile-btn"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >

            <FaUserCircle size={35} />

            <div>

              <strong>{admin.name}</strong>

              <small>Administrator</small>

            </div>

            <FaChevronDown />

          </button>

          {showProfile && (

            <div className="profile-box">

              <h3>{admin.name}</h3>

              <p>{admin.email}</p>

              <hr />

              <button onClick={logout}>

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;