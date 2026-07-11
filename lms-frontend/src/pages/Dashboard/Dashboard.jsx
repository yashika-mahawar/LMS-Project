import React from "react";

// 1. Internal Dashboard Components
import WelcomeCard from "./WelcomeCard/WelcomeCard";
import StatsCards from "./StatsCards/StatsCards";
import Activity from "./Activity/Activity";
import Notifications from "./Notifications/Notifications";

// 2. Global Shared Components
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar"; 

// 3. CSS Import
import "./Dashboard.css";

const Dashboard = () => {
  const ongoingCourses = [
    {
      id: 1,
      title: "B.Tech Computer Science",
      prof: "Dr. Rahul Sharma",
      progress: 70,
      duration: "4 Years",
    },
    {
      id: 2,
      title: "Web Development BootCamp",
      prof: "Prof. Amit Verma",
      progress: 45,
      duration: "6 Months",
    },
    {
      id: 3,
      title: "UI/UX Design Essentials",
      prof: "Prof. Neha Gupta",
      progress: 90,
      duration: "3 Months",
    },
    {
      id: 4,
      title: "Database Management Systems",
      prof: "Dr. Anjali Mehta",
      progress: 20,
      duration: "1 Semester",
    },
  ];

  return (
    // Pura page layout do bhagon me divide hoga: Sidebar + Main Content
    <div
      className="dashboard-layout-wrapper"
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* LEFT SIDE: Fixed Sidebar (isAdmin={false} pass kiya hai) */}
      <aside
        style={{
          width: "260px",
          minWidth: "260px",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <Sidebar isAdmin={false} />
      </aside>

      {/* RIGHT SIDE: Main Content Wrapper */}
      <div
        className="dashboard-right-side"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Top Navigation Header */}
        <Header />

        {/* Scrollable Dashboard Body */}
        <main
          className="dashboard-main-content"
          style={{
            padding: "24px",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {/* Welcome Section */}
          <section style={{ marginBottom: "24px" }}>
            <WelcomeCard />
          </section>

          {/* Stats Section */}
          <section style={{ marginBottom: "32px" }}>
            <StatsCards />
          </section>

          {/* My Learning Section */}
          <section style={{ marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                My Learning
              </h2>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#4f46e5",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                View All
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "20px",
              }}
            >
              {ongoingCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "16px",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.02), 0 2px 4px -2px rgb(0 0 0 / 0.02)",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        background: "#e0e7ff",
                        color: "#4f46e5",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {course.duration}
                    </span>
                    <h3
                      style={{
                        margin: "12px 0 6px 0",
                        fontSize: "1.05rem",
                        color: "#0f172a",
                        fontWeight: "600",
                      }}
                    >
                      {course.title}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 16px 0",
                        fontSize: "0.85rem",
                        color: "#64748b",
                      }}
                    >
                      {course.prof}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8rem",
                        color: "#475569",
                        marginBottom: "6px",
                        fontWeight: "500",
                      }}
                    >
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#f1f5f9",
                        height: "8px",
                        borderRadius: "9999px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${course.progress}%`,
                          backgroundColor: "#4f46e5",
                          height: "100%",
                          borderRadius: "9999px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Grid for Analytics/Modules */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {/* Left Column Stack - Only Activity now */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.01)",
                }}
              >
                <Activity />
              </div>
            </div>

            {/* Right Column Stack - Only Notifications now */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.01)",
                }}
              >
                <Notifications />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;