import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useNavigate } from "react-router-dom";
import api from "./services/api";
import "./App.css"; 

import Dashboard from "./components/Dashboard";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Wrap fetchJobs in useCallback so it's stable for useEffect
  const fetchJobs = useCallback(async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchJobs();
    }
  }, [navigate, fetchJobs]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    /* This main div must wrap EVERYTHING */
    <div className="page-wrapper">
      
      <header className="main-header">
        <h1>Job Tracker 🚀</h1>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      {/* Analytics */}
      <Dashboard jobs={jobs} /> 


      {/* Entry Form */}
      <div className="form-section">
        <JobForm fetchJobs={fetchJobs} />
      </div>

        {/* Toolbar */}
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="🔍 Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-group">
          {["All", "Applied", "Interview", "Offer", "Rejected"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? "active" : ""}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* List Section */}
      <h2 className="section-title">Your Applications</h2>
      <JobList jobs={filteredJobs} fetchJobs={fetchJobs} />
      
    </div>
  );
}

export default App;