import api from "../services/api";
import "../style/JobList.css"

export default function JobList({ jobs, fetchJobs }) {

  // Deadline alert
  const isNearDeadline = (date) => {
    if (!date) return false;
    const diff = new Date(date) - new Date();
    return diff < 2 * 24 * 60 * 60 * 1000;
  };

  //  Toggle important
  const toggleImportant = async (job) => {
    try {
      await api.put(`/jobs/${job._id}`, {
        isImportant: !job.isImportant
      });
      fetchJobs();
    } catch (err) {
      alert("Update failed");
    }
  };

  // Sort latest first
  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch {
      alert("Delete failed");
    }
  };

 return (
  <div className="job-grid">
    {sortedJobs.map((job) => (
      <div key={job._id} className="job-card">
        {/* Top Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3>{job.company}</h3>
            <p className="job-role">{job.role}</p>
          </div>
          <span className="status-badge">{job.status}</span>
        </div>

        {/* Info Section */}
        <div className="job-details">
          <p><strong>Notes:</strong> {job.notes || "No notes added."}</p>
          
          <p className={`deadline-text ${isNearDeadline(job.deadline) ? "deadline-urgent" : ""}`}>
            🗓 Deadline: {job.deadline?.slice(0, 10)}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="card-actions">
          <button className="btn-important" onClick={() => toggleImportant(job)}>
            {job.isImportant ? "⭐ Important" : "☆ Mark"}
          </button>

          <a href={job.link} target="_blank" rel="noreferrer" className="apply-link">
            Apply Now →
          </a>

          <button className="btn-delete" onClick={() => handleDelete(job._id)}>
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}