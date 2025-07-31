import React from "react";

export const Fab: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className="fab" title="New note" onClick={onClick}>
    +
  </button>
);
