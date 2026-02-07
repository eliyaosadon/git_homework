import { useEffect, useState } from "react"
import NoteForm from "./components/NoteForm"
import NotesGrid from "./components/NoteGrid"
import NoteModal from "./components/NoteModal"

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes")
    return saved ? JSON.parse(saved) : []
  })

  const [selectedNote, setSelectedNote] = useState(null)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = (note) => {
    setNotes(prev => [note, ...prev])
  }

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete your note?")) {
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const updateNote = (updatedNote) => {
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
    setSelectedNote(null)
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.text.toLowerCase().includes(search.toLowerCase()) ||
      (note.title && note.title.toLowerCase().includes(search.toLowerCase()))

    const matchesCategory =
      categoryFilter === "All" || note.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ padding: 20 }}>
      <h1>QuickNotes 📝</h1>

      <NoteForm onSubmit={addNote} />

      <input
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ margin: "10px 0", width: "100%" }}
      />

      <div>
        {["All", "Personal", "Work", "Other"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{ marginRight: 5 }}
          >
            {cat}
          </button>
        ))}
      </div>

      <NotesGrid
        notes={filteredNotes}
        onNoteClick={setSelectedNote}
        deleteNote={deleteNote}
      />

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={updateNote}
        />
      )}
    </div>
  )
}

export default App
