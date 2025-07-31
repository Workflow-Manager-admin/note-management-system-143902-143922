import React, { useState, useEffect } from "react";
import "./components/global.css";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { Fab } from "./components/Fab";
import { AuthForm } from "./components/AuthForm";
import { SearchBox } from "./components/SearchBox";
import { NoteList } from "./components/NoteList";
import { NoteEditor } from "./components/NoteEditor";
import { NoteViewer } from "./components/NoteViewer";
import {
  getNotes, createNote, updateNote, deleteNote, login, signup, Note, User,
} from "./components/Api";

// Utils for local storage auth (very basic, for demo)
function saveUserToStorage(user: User) {
  window.localStorage.setItem("notesUser", JSON.stringify(user));
}
function loadUserFromStorage(): User | null {
  try {
    const s = window.localStorage.getItem("notesUser");
    if (!s) return null;
    return JSON.parse(s);
  } catch {
    return null;
  }
}
function clearUserInStorage() {
  window.localStorage.removeItem("notesUser");
}

// PUBLIC_INTERFACE
export const App: React.FC = () => {
  // Auth state
  const [user, setUser] = useState<User | null>(loadUserFromStorage());
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Notes state
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editorMode, setEditorMode] = useState<"none" | "edit" | "new">("none");
  const [editorSaving, setEditorSaving] = useState(false);

  // Error
  const [operationError, setOperationError] = useState<string | null>(null);

  // Derived categories
  const categories = Array.from(
    new Set(notes.map(n => n.category).filter(Boolean))
  );

  // Load all notes
  function reloadNotes() {
    if (!user) return;
    setNotesLoading(true);
    getNotes(user.token, selectedCategory === "All" ? "" : selectedCategory, search)
      .then(ns => {
        setNotes(ns);
        if (selectedNoteId && !ns.find(n => n.id === selectedNoteId)) {
          setSelectedNoteId(ns.length ? ns[0].id : null);
        }
      })
      .catch(() => {
        setOperationError("Could not load notes. Please try again.");
      })
      .finally(() => setNotesLoading(false));
  }

  useEffect(() => {
    if (user) reloadNotes();
    // only re-run when user/category/search changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedCategory, search]);

  function handleLogin(username: string, password: string) {
    setAuthLoading(true);
    setAuthError(null);
    login(username, password)
      .then(data => {
        setUser(data);
        saveUserToStorage(data);
      })
      .catch(() => setAuthError("Invalid login credentials."))
      .finally(() => setAuthLoading(false));
  }

  function handleSignup(username: string, password: string) {
    setAuthLoading(true);
    setAuthError(null);
    signup(username, password)
      .then(data => {
        setUser(data);
        saveUserToStorage(data);
      })
      .catch(() => setAuthError("Could not sign up; try a different username."))
      .finally(() => setAuthLoading(false));
  }

  function handleLogout() {
    setUser(null);
    clearUserInStorage();
    setNotes([]);
    setSelectedNoteId(null);
    setEditorMode("none");
  }

  function handleCreateNote(data: {title: string, content: string, category: string}) {
    if (!user) return;
    setEditorSaving(true);
    createNote(user.token, data)
      .then(note => {
        setEditorMode("none");
        reloadNotes();
        setTimeout(() => setSelectedNoteId(note.id), 100);
      })
      .catch(() => setOperationError("Failed to create note."))
      .finally(() => setEditorSaving(false));
  }

  function handleUpdateNote(data: {title: string, content: string, category: string}) {
    if (!user || !selectedNoteId) return;
    setEditorSaving(true);
    updateNote(user.token, selectedNoteId, data)
      .then(() => {
        setEditorMode("none");
        reloadNotes();
      })
      .catch(() => setOperationError("Failed to save changes."))
      .finally(() => setEditorSaving(false));
  }

  function handleDeleteNote() {
    if (!user || !selectedNoteId) return;
    setEditorSaving(true);
    deleteNote(user.token, selectedNoteId)
      .then(() => {
        setEditorMode("none");
        setSelectedNoteId(null);
        reloadNotes();
      })
      .catch(() => setOperationError("Failed to delete note."))
      .finally(() => setEditorSaving(false));
  }

  // The note currently selected
  const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

  // Layout
  if (!user) {
    return (
      <div style={{ display: 'flex', minHeight: "100vh", background: "var(--secondary)" }}>
        <AuthForm
          onLogin={handleLogin}
          onSignup={handleSignup}
          loading={authLoading}
          error={authError ?? undefined}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--secondary)" }}>
      <Header user={user} onLogout={handleLogout}/>
      <div style={{
        display: "flex", minHeight: `calc(100vh - var(--header-height))`
      }}>
        <SideMenu
          categories={categories}
          selected={selectedCategory}
          onSelect={c => { setSelectedCategory(c); setSelectedNoteId(null); }}
        />
        <main style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          background: "var(--secondary)",
          minHeight: `calc(100vh - var(--header-height))`,
          padding: "1.5em 2.5em",
          gap: "2em"
        }}>
          {/* Left: Notes list and search */}
          <section style={{ minWidth: 295, maxWidth: 375, flex: "0 0 320px", borderRight: "1.5px solid #ececec", paddingRight: 18 }}>
            <SearchBox value={search} onChange={setSearch}/>
            <NoteList
              notes={notes}
              selectedNoteId={selectedNoteId}
              onSelectNote={nid => {
                setSelectedNoteId(nid);
                setEditorMode("none");
              }}
            />
          </section>
          {/* Main panel: note content, viewer/editor */}
          <section style={{
            flex: 1,
            padding: "1em",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center"
          }}>
            {notesLoading && <div>Loading notes...</div>}
            {operationError && <div style={{ color: "var(--accent)" }}>{operationError}</div>}
            {!notesLoading && !editorMode && selectedNote && (
              <NoteViewer note={selectedNote} onEdit={() => setEditorMode("edit")}/>
            )}
            {editorMode === "new" && (
              <NoteEditor
                note={undefined}
                saving={editorSaving}
                categories={["Personal", "Work", "Learning", "Idea", ...categories.filter((c) => !["Personal", "Work", "Learning", "Idea"].includes(c))]}
                onSave={handleCreateNote}
                onCancel={() => setEditorMode("none")}
              />
            )}
            {editorMode === "edit" && selectedNote && (
              <NoteEditor
                note={selectedNote}
                saving={editorSaving}
                categories={["Personal", "Work", "Learning", "Idea", ...categories.filter((c) => !["Personal", "Work", "Learning", "Idea"].includes(c))]}
                onSave={handleUpdateNote}
                onDelete={handleDeleteNote}
                onCancel={() => setEditorMode("none")}
              />
            )}
            {!selectedNote && editorMode === "none" && (
              <div style={{ color: "#bbb", fontSize: "1.5em", marginTop: 90, textAlign: "center" }}>
                No note selected.
                <br />
                <span style={{ fontSize: "1em", fontStyle: "italic" }}>Choose a note or add a new one.</span>
              </div>
            )}
          </section>
        </main>
        <Fab onClick={() => setEditorMode("new")} />
      </div>
    </div>
  );
};
