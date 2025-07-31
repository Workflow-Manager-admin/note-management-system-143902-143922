import React from "react";

export const SearchBox: React.FC<{
  value: string;
  onChange: (s: string) => void;
}> = ({ value, onChange }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10, padding: "0.8em 0"
  }}>
    <input
      type="search"
      placeholder="Search notes..."
      value={value}
      style={{
        maxWidth: 250,
        border: "1px solid #eee",
        background: "#fff",
      }}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);
