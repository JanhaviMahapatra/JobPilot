import { useState } from "react";
import api from "../services/api";
import "../style/JobForm.css"

export default function JobForm({ fetchJobs }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    link: "",
    notes: "",
    deadline: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", form);

      setForm({
        company: "",
        role: "",
        link: "",
        notes: "",
        deadline: ""
      });

      fetchJobs();
    } catch (err) {
      alert("Error adding job");
    }
  };

 return (
  <div className="page-wrapper">
    <form onSubmit={handleSubmit} className="form-container">
      <h2 style={{ margin: "0 0 10px 0", fontSize: "1.5rem", fontWeight: "700" }}>
        New Job Application
      </h2>
      
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
      <input name="link" placeholder="Link" value={form.link} onChange={handleChange} />
      
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      
      <div className="input-wrapper">
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '4px' }}>Deadline</span>
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
      </div>

      <button type="submit" className="submit-btn">Add Job</button>
    </form>
  </div>
);
}