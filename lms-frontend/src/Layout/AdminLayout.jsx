// src/components/Layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar"; 

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
    <Sidebar />
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f8fafc", overflowY: "auto" }}>
        {/* Outlet ka matlab hai ki jo Route child hai (Dashboard/Students), wo yahan dikhega */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;