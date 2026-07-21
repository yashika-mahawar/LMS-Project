import React, { useState, useEffect } from "react";
import { FaClipboardList, FaClock } from "react-icons/fa";
import axios from "axios";
import API from "../../../services/api";
const Assignments = () => {
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {

      // Student enrolled courses
      const enrolledRes = await API.get(
  "/api/enrollments/my-courses"
);

      const enrolledTitles = enrolledRes.data.data.map(
        (item) => item.courses.title
      );

      // All assignments
      const assignmentRes = await API.get(
  "/api/assignments"
);
      // Sirf enrolled course ke assignments
      const filtered = (assignmentRes.data.data || []).filter((item) =>
        enrolledTitles.includes(item.courses?.title)
      );

      setFilteredAssignments(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1
        style={{
          marginBottom: "10px",
        }}
      >
        Academic Assignments
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Upload and track your continuous internal evaluations.
      </p>

      {loading ? (
            <h3>Loading Assignments...</h3>
          ) : filteredAssignments.length === 0 ? (
            <h3>No assignments available.</h3>
          ) : (
            filteredAssignments.map((task) => (
              <div
                key={task.id}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#eef2ff",
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  >
                    <FaClipboardList color="#4f46e5" size={20} />
                  </div>

                  <div>
                    <h3
                      style={{
                        margin: 0,
                      }}
                    >
                      {task.title}
                    </h3>

                    <p
                      style={{
                        marginTop: "6px",
                        color: "#64748b",
                      }}
                    >
                      {task.courses?.title}
                    </p>

                    <p
                      style={{
                        marginTop: "4px",
                        color: "#ef4444",
                        fontWeight: "600",
                      }}
                    >
                      Due: {task.due_date}
                    </p>

                    {task.description && (
                      <p
                        style={{
                          marginTop: "8px",
                          color: "#555",
                        }}
                      >
                        {task.description}
                      </p>
                    )}

                    {task.file_url && (
                      <a
                        href={task.file_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Assignment
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <span
                    style={{
                      background: "#fef2f2",
                      color: "#ef4444",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: "600",
                    }}
                  >
                    <FaClock />
                    Pending
                  </span>
                </div>
              </div>
            ))
          )}
    </div>
  );
};

export default Assignments;