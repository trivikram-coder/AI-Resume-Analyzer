import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const result = await loginUser(form);
      if (result.status) {
        setMessage(result.message || "Login successful!");
        localStorage.setItem("email", form.email);
        window.location.href = "/upload";
      } else {
        setError(result.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="pill">Welcome back</p>
        <h1 className="panel-title">Sign in to your workspace</h1>
        <p className="panel-subtitle">
          Continue optimizing resumes, tracking reports, and sharing insights
          with hiring managers.
        </p>
        <div className="hint">
          New here?{" "}
          <Link to="/register">Create account</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <div className="input-group">
            <label className="input-label">Work email</label>
            <input
              className="input-control"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input-control"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="muted">Secure login to keep your resume data private.</p>
        </div>

        {message && <div className="message">{message}</div>}
        {error && <div className="message error">{error}</div>}
      </form>
    </section>
  );
}
