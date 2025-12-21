import React, { useState } from "react";
import { uploadResume } from "../api/api";

export default function UploadResume() {
  const email = localStorage.getItem("email");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Select a PDF or DOCX resume to upload.");
      return;
    }
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const result = await uploadResume(email, file, desc);
      if (result.status) {
        setMessage(result.message || "Uploaded successfully.");
        setDesc("");
        setFile(null);
      } else {
        setError(result.message || "Upload failed. Try again.");
      }
    } catch (err) {
      setError("Unable to upload right now. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="pill">AI analysis</p>
        <h1 className="panel-title">Upload a resume to analyze</h1>
        <p className="panel-subtitle">
          We'll parse your resume, score it against best practices, and
          generate recruiter-friendly talking points you can copy into emails
          or ATS portals.
        </p>
      </div>

      <div className="grid-2">
        <div className="input-group">
          <label className="input-label">Resume file</label>
          <div className="file-drop">
            <input
              className="input-control"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="muted" style={{ marginTop: 12 }}>
              {file ? `✓ Selected: ${file.name}` : "📎 Upload PDF or DOCX up to 5MB"}
            </p>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">What role are you targeting?</label>
          <textarea
            className="textarea-control"
            placeholder="e.g., Product Manager focused on B2B SaaS. Emphasize roadmap ownership and stakeholder alignment."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
          {loading ? "⏳ Uploading..." : "🚀 Upload & Analyze"}
        </button>
        <p className="muted">AI feedback returns in seconds. Stay on this page.</p>
      </div>

      {message && <div className="message">{message}</div>}
      {error && <div className="message error">{error}</div>}
    </section>
  );
}
