import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons import karo

const ChangePassword = () => {
  const [pass, setPass] = useState({ old: '', new: '', confirm: '' });
  const [show, setShow] = useState({ old: false, new: false, confirm: false }); // Visibility state
  const [msg, setMsg] = useState('');

  const handleUpdate = () => {
    if (pass.new !== pass.confirm) { setMsg('Error: Passwords do not match!'); return; }
    if (pass.new.length < 6) { setMsg('Error: Password too short!'); return; }
    setMsg('Password Updated Successfully!');
  };

  // Input wrapper style
  const inputContainerStyle = { position: 'relative', display: 'flex', alignItems: 'center', width: '100%' };
  const iconStyle = { position: 'absolute', right: '15px', cursor: 'pointer', color: '#94a3b8' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Security Settings</h3>
      
      {/* Old Password */}
      <div style={inputContainerStyle}>
        <input 
          type={show.old ? "text" : "password"} 
          placeholder="Old Password" 
          onChange={e => setPass({...pass, old: e.target.value})}
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%' }}
        />
        <span onClick={() => setShow({...show, old: !show.old})} style={iconStyle}>
          {show.old ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      
      {/* New Password & Confirm Password */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={inputContainerStyle}>
          <input 
            type={show.new ? "text" : "password"} 
            placeholder="New Password" 
            onChange={e => setPass({...pass, new: e.target.value})}
            style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%' }}
          />
          <span onClick={() => setShow({...show, new: !show.new})} style={iconStyle}>
            {show.new ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div style={inputContainerStyle}>
          <input 
            type={show.confirm ? "text" : "password"} 
            placeholder="Confirm New Password" 
            onChange={e => setPass({...pass, confirm: e.target.value})}
            style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%' }}
          />
          <span onClick={() => setShow({...show, confirm: !show.confirm})} style={iconStyle}>
            {show.confirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      
      {msg && <p style={{ margin: '0', color: msg.startsWith('Error') ? '#ef4444' : '#22c55e', fontWeight: '500' }}>{msg}</p>}
      
      <button onClick={handleUpdate} style={{ padding: '16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
        Update Password
      </button>
    </div>
  );
};

export default ChangePassword;