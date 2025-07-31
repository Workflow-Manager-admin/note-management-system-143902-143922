import React from "react";

interface SideMenuProps {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ categories, selected, onSelect }) => (
  <aside
    className="side-menu"
    style={{
      width: "var(--menu-width)",
      minWidth: "var(--menu-width)",
      background: "var(--background)",
      borderRight: "1.5px solid #ececec",
      display: "flex",
      flexDirection: "column",
      padding: "1.4rem 0 1.4rem 0.2rem",
    }}
  >
    <div style={{ fontWeight: 600, color: "var(--primary)", marginLeft: 22, marginBottom: 14, fontSize: "1.12rem" }}>
      Categories
    </div>
    {["All", ...categories].map((cat) => (
      <button
        key={cat}
        className="menu-label"
        style={{
          background: selected === cat ? "var(--accent)" : "transparent",
          color: selected === cat ? "#fff" : "#444",
          margin: "3px 10px",
          textAlign: "left",
          padding: "0.7em 1.2em",
          fontWeight: 500,
          border: 0,
          borderRadius: "var(--border-radius)",
          fontSize: "1em",
          transition: "all var(--transition)",
        }}
        onClick={() => onSelect(cat)}
      >{cat}</button>
    ))}
  </aside>
);
