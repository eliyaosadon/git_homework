import NoteForm from "./NoteForm"

function NoteModal({ note, onClose, onUpdate }) {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)"
        }}>
            <div style={{
                background: "white",
                padding: 20,
                margin: "10% auto",
                width: "400px"
            }}>
                <button onClick={onClose}>X</button>
                <NoteForm
                    initialData={note}
                    onSubmit={onUpdate}
                />
            </div>
        </div>
    )
}

export default NoteModal
