import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const result = await registerUser(form);
      if (result.status) {
        setMessage(result.message || "Account created!");
      } else {
        setError(result.message || "Could not create account.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="pill">Join the waitlist</p>
        <h1 className="panel-title">Create your account</h1>
        <p className="panel-subtitle">
          Store resumes, analyze them with AI, and download recruiter-ready
          reports in seconds.
        </p>
        <div className="hint">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <div className="input-group">
            <label className="input-label">Full name</label>
            <input
              className="input-control"
              type="text"
              placeholder="Taylor Jackson"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Work email</label>
            <input
              className="input-control"
              type="email"
              placeholder="taylor@company.com"
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
            {loading ? "Creating account..." : "Create account"}
          </button>
          <p className="muted">Get AI-powered resume insights instantly.</p>
        </div>

        {message && <div className="message">{message}</div>}
        {error && <div className="message error">{error}</div>}
      </form>
    </section>
  );
}
