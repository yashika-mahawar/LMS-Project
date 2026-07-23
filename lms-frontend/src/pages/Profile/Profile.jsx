import React, { useState, useRef, useEffect } from 'react';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import { FaUserCircle, FaShieldAlt, FaCamera, FaPlus, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import axios from "axios";
import API from "../../services/api"; // (path apne folder structure ke hisaab se check kar lena)
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [skills, setSkills] = useState(['React.js', 'UI/UX Design', 'Project Management']);
  
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");

  return savedUser
    ? JSON.parse(savedUser)
    : {
        full_name: "",
        email: "",
        phone: "",
        program: "",
        profile_image: "",
      };
});

  // IMPORTANT: Yeh useEffect ensure karega ki agar tumne
  // EditProfile se data change kiya, toh Profile page turant update ho jaye
  useEffect(() => {
  const handleStorageChange = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  handleStorageChange();

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("userUpdated", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("userUpdated", handleStorageChange);
  };
}, []);

  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {

  const file = event.target.files[0];

  if (!file) return;


  try {

    // temporary preview
    const reader = new FileReader();

    reader.onloadend = async () => {

      const imageUrl = reader.result;


      const updatedUser = {
        ...user,
        profile_image: imageUrl
      };


      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
      window.dispatchEvent(new Event("userUpdated"));

      // Save image URL in database
      await axios.put(
  `${import.meta.env.VITE_API_URL}/api/auth/update-profile/${user.id}`,
  {
    profile_image: imageUrl
  }
);

    };


    reader.readAsDataURL(file);


  } catch(error){

    console.log(
      "Image Upload Error:",
      error
    );

  }

};

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <div style={{ 
            background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', 
            borderRadius: '28px', padding: '48px', color: 'white', marginBottom: '32px', 
            display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.3)'
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid rgba(255,255,255,0.3)', overflow: 'hidden' }}>
                {user.profile_image ? (
                  <img src={user.profile_image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FaUserCircle size={130} color="#cbd5e1" />
                )}
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
                accept="image/*" 
              />

              <button 
                onClick={() => fileInputRef.current.click()} 
                style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#4f46e5', border: '2px solid #fff', borderRadius: '50%', padding: '10px', cursor: 'pointer', color: '#fff' }}
              >
                <FaCamera size={14} />
              </button>
            </div>
            
            <div>
              {/* Ab yahan wahi naam aayega jo tumne Signup ya EditProfile mein dala hai */}
              <h1 style={{ margin: '0', fontSize: '2.5rem', letterSpacing: '-0.02em' }}>{user.full_name || "User Name"}</h1>
              <p style={{ margin: '8px 0', fontSize: '1.1rem', opacity: '0.9' }}>{user.program} | TVI Academy</p>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '28px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', gap: '40px', borderBottom: '2px solid #f8fafc', marginBottom: '32px' }}>
              {['profile', 'password'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '16px 8px', border: 'none', background: 'none', cursor: 'pointer', 
                    fontWeight: '700', fontSize: '1.05rem', color: activeTab === tab ? '#4f46e5' : '#64748b',
                    borderBottom: activeTab === tab ? '3px solid #4f46e5' : 'none', transition: '0.3s'
                  }}
                >
                  {tab === 'profile' ? <><FaUserCircle style={{ marginRight: '8px' }}/> My Profile</> : <><FaShieldAlt style={{ marginRight: '8px' }}/> Security</>}
                </button>
              ))}
            </div>

            {activeTab === 'profile' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <EditProfile />
              </div>
            ) : (
              <div style={{ padding: '20px 0' }}>
                <ChangePassword />
              </div>
            )}
          </div>
    </div>
  );
};

export default Profile;