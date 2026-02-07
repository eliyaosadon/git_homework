import Note from "./Note"

function NotesGrid({ notes, onNoteClick, deleteNote }) {
    if (notes.length === 0) return <p>No notes yet ✨</p>

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 10,
            marginTop: 20
        }}>
            {notes.map(note => (
                <Note
                    key={note.id}
                    note={note}
                    onClick={() => onNoteClick(note)}
                    deleteNote={deleteNote}
                />
            ))}
        </div>
    )
}

export default NotesGrid
