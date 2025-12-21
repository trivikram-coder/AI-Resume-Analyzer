import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { to: "/", label: "Login", icon: "🔐" },
  { to: "/register", label: "Register", icon: "👤" },
  { to: "/upload", label: "Upload Resume", icon: "📄" },
  { to: "/reports", label: "Reports", icon: "📊" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">✨</div>
          <div className="logo-text">
            <div className="logo-title">AI Resume</div>
            <div className="logo-subtitle">Analyzer</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "sidebar-item--active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-content">
          <p className="sidebar-footer-text">AI-powered insights</p>
          <p className="sidebar-footer-subtext">Get hired faster</p>
        </div>
      </div>
    </aside>
  );
}

