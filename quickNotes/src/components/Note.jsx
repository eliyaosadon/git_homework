const categoryColors = {
    Personal: "#e6f7ff",
    Work: "#fff4e6",
    Other: "#f0f0f0"
}

function Note({ note, onClick, deleteNote }) {
    const format = (date) =>
        new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })

    return (
        <div
            onClick={onClick}
            style={{
                background: categoryColors[note.category],
                padding: 10,
                borderRadius: 8,
                cursor: "pointer"
            }}
        >
            {note.title && <h4>{note.title}</h4>}
            <p>{note.text}</p>

            <small>Created: {format(note.createdAt)}</small><br />
            {note.updatedAt && <small>Updated: {format(note.updatedAt)}</small>}

            <div>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                    }}
                >
                    🗑
                </button>
            </div>
        </div>
    )
}

export default Note
