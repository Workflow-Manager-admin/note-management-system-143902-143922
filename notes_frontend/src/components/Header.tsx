import React from "react";

interface HeaderProps {
  user?: { username: string };
  onLogout: () => void;
}
export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => (
  <header
    style={{
      height: "var(--header-height)",
      background: "var(--primary)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "0 2rem",
      boxShadow: "0 1px 4px #0001",
      position: "sticky",
      top: 0,
      zIndex: 10,
      justifyContent: "space-between"
    }}
  >
    <div style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: 1 }}>
      <span style={{ color: "var(--accent)" }}>✎</span> Notes App
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      {user && (
        <>
          <span style={{ marginRight: 18, opacity: 0.85 }}>
            {user.username}
          </span>
          <button style={{
            background: "var(--secondary)",
            color: "var(--primary)",
            fontWeight: 500,
            border: 0,
            padding: "0.4em 1em",
          }} onClick={onLogout}>Logout</button>
        </>
      )}
    </div>
  </header>
);
