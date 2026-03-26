import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../style/Register.css"

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
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
      await api.post("/auth/register", form);

      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register error");
    }
  };

return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h2>Create Account</h2>
      <p className="auth-subtitle">Start tracking your career journey today.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          className="auth-input"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-button">
          Get Started
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? 
        <Link to="/login" className="auth-link">Login</Link>
      </p>
    </div>
  </div>
);
}