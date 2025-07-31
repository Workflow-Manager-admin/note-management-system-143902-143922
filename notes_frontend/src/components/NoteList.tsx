import React from "react";
import { Note } from "./Api";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, selectedNoteId, onSelectNote }) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxHeight: "calc(100vh - var(--header-height) - 70px)",
    overflowY: "auto",
    width: "100%"
  }}>
    {notes.map(note =>
      <div
        key={note.id}
        onClick={() => onSelectNote(note.id)}
        style={{
          background: note.id === selectedNoteId ? "var(--primary)" : "#fff",
          color: note.id === selectedNoteId ? "#fff" : "#222",
          borderRadius: "var(--border-radius)",
          boxShadow: note.id === selectedNoteId ? "0 1.5px 5px #0001" : "",
          padding: "1em 1.3em",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: "1.02em",
          transition: "all 0.12s",
          borderLeft: note.id === selectedNoteId ? `5px solid var(--accent)` : "0"
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.08em", marginBottom: 4 }}>{note.title}</div>
        <div style={{
          opacity: 0.63, fontSize: "0.96em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
        }}>{note.content.replace(/\n/g, " ")}</div>
        <div style={{
          marginTop: 5,
          fontSize: "0.8em",
          color: "var(--primary)",
          opacity: 0.8
        }}>
          <span>{note.category}</span>{" • "}
          <span>{new Date(note.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    )}
    {notes.length === 0 &&
      <div style={{
        padding: "1em",
        color: "#888",
        fontStyle: "italic",
        textAlign: "center"
      }}>No notes found.</div>
    }
  </div>
);
