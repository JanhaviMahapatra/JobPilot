import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../services/api";
import "../style/Login.css"

export default function Login() {
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
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h2>Login</h2>

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
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-button">
          Sign In
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? 
        <Link to="/register" className="auth-link">Register</Link>
      </p>
    </div>
  </div>
);
}