import React, { useState, useEffect } from "react";
import { Note } from "./Api";

interface NoteEditorProps {
  note?: Note;
  saving: boolean;
  categories: string[];
  onSave: (data: {title: string, content: string, category: string}) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, saving, categories, onSave, onDelete, onCancel }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [category, setCategory] = useState(note ? note.category : categories[0] || "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    } else {
      setTitle("");
      setContent("");
      setCategory(categories[0] || "");
    }
  }, [note, categories]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, content, category });
  }

  return (
    <form onSubmit={submit} style={{
      background: "#fff",
      padding: "2.8em 2.6em",
      borderRadius: "var(--border-radius)",
      boxShadow: "0 1.5px 8px #0001",
      maxWidth: 730,
      width: "100%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "1em"
    }}>
      <input
        type="text"
        required
        placeholder="Note title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        maxLength={80}
        style={{ fontWeight: 700, fontSize: "1.3em" }}
        autoFocus
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={12}
        style={{ fontSize: "1.08em", lineHeight: 1.67, resize: "vertical" }}
      />
      <div style={{ display: "flex", gap: 11, marginTop: 18 }}>
        <button type="submit" className="btn-primary" disabled={saving}>
          {note ? (saving ? "Saving..." : "Save Changes") : (saving ? "Creating..." : "Create Note")}
        </button>
        {onDelete && note &&
          <button type="button" style={{
            background: "var(--accent)",
            color: "#fff"
          }} onClick={onDelete}>Delete</button>
        }
        {onCancel &&
          <button type="button" style={{
            background: "#eaeaea",
            color: "#333"
          }} onClick={onCancel}>Cancel</button>
        }
      </div>
    </form>
  );
}
