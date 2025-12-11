import React, { useEffect, useState } from "react";
import { getReports, deleteReport } from "../api/api";

function titleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Reports() {
  const email = localStorage.getItem("email");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      const result = await getReports(email);
      if (result.status) setReports(result.reports);
      setLoading(false);
    }
    loadReports();
  }, [email]);

  const remove = async (id) => {
    await deleteReport(id);
    setReports((current) => current.filter((r) => r.id !== id));
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="pill">Insights</p>
          <h1 className="panel-title">Your AI-generated reports</h1>
          <p className="panel-subtitle">
            Every upload produces an actionable breakdown—ATS friendliness,
            clarity, and recruiter-ready talking points.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="empty">Loading your reports...</div>
      ) : reports.length === 0 ? (
        <div className="empty">
          No reports yet. Upload a resume to get AI suggestions.
        </div>
      ) : (
        <div className="report-grid">
          {reports.map((r) => (
            <article className="report-card styled" key={r.id}>
              
              {/* HEADER */}
              <div className="report-meta">
                <span className="pill purple">AI Report</span>
                <button className="btn btn-secondary" onClick={() => remove(r.id)}>
                  Delete
                </button>
              </div>

              {/* SUMMARY */}
              <div className="section">
                <p className="muted">Summary</p>
                <div className="content">{r.summary}</div>
              </div>

              {/* ATS SCORE */}
              <div className="section">
                <p className="muted">ATS Score</p>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${r.atsScore}%` }}></div>
                </div>
                <p className="bar-value">{r.atsScore}%</p>
              </div>

              {/* JOB MATCH */}
              <div className="section">
                <p className="muted">Job Match</p>
                <div className="bar-container">
                  <div className="bar-fill green" style={{ width: `${r.jobMatch}%` }}></div>
                </div>
                <p className="bar-value">{r.jobMatch}%</p>
              </div>

              {/* ROLES */}
              <div className="section">
                <p className="muted">Recommended Roles</p>
                <ul className="list">
                  {r.jobRecommendation?.map((j, i) => (
                    <li key={i}>{titleCase(j)}</li>
                  ))}
                </ul>
              </div>

              {/* STRENGTHS */}
              <div className="section">
                <p className="muted">Strengths</p>
                <ul className="list">
                  {r.strengths?.map((s, i) => (
                    <li key={i}>{titleCase(s)}</li>
                  ))}
                </ul>
              </div>

              {/* MISSING KEYWORDS */}
              <div className="section">
                <p className="muted">Missing Keywords</p>
                <ul className="list">
                  {r.missingKeywords?.map((k, i) => (
                    <li key={i}>{titleCase(k)}</li>
                  ))}
                </ul>
              </div>

              {/* IMPROVEMENTS */}
              <div className="section">
                <p className="muted">Improvements</p>
                <ul className="list">
                  {r.improvements?.map((imp, i) => (
                    <li key={i}>{titleCase(imp)}</li>
                  ))}
                </ul>
              </div>

            </article>
          ))}
        </div>
      )}
    </section>
  );
}
