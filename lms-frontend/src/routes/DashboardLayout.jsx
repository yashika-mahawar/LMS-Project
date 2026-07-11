import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar'; // Sahi path check kar lena
import Header from '../components/Header/Header';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', overflowX: 'hidden' }}>
      {/* Fixed Left Sidebar */}
      <aside style={{ width: '260px', minWidth: '260px', height: '100vh', position: 'sticky', top: 0, zIndex: 50 }}>
        <Sidebar />
      </aside>

      {/* Dynamic Right Content Area */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, width: 'calc(100vw - 260px)' }}>
        <Header />
        
        {/* Is Outlet ke andar saare sub-pages render honge auto spacing ke saath */}
        <main style={{ padding: '32px', maxWidth: '1320px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;