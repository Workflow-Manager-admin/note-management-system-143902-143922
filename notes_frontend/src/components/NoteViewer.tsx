import React from "react";
import { Note } from "./Api";

export const NoteViewer: React.FC<{
  note: Note | null;
  onEdit: () => void;
}> = ({ note, onEdit }) => {
  if (!note) return (
    <div style={{
      padding: "2.6em",
      color: "#666",
      fontStyle: "italic"
    }}>
      Select a note to view.
    </div>
  );
  return (
    <div style={{
      background: "#fff",
      padding: "2.8em 2.6em",
      borderRadius: "var(--border-radius)",
      boxShadow: "0 1.5px 8px #0001",
      maxWidth: 730,
      width: "100%",
      margin: "auto",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ fontSize: "2em", fontWeight: 800, marginBottom: 8 }}>{note.title}</div>
      <div style={{ color: "var(--primary)", fontWeight: 500, marginBottom: 6 }}>{note.category}</div>
      <div style={{ fontSize: "1.1em", marginBottom: 15, whiteSpace: "pre-wrap", minHeight: 180 }}>
        {note.content}
      </div>
      <div style={{ color: "#aaa", fontSize: "0.97em", alignSelf: "flex-end" }}>
        Last updated: {new Date(note.updated_at).toLocaleString()}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button style={{ background: "var(--primary)", color: "#fff" }} onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};
