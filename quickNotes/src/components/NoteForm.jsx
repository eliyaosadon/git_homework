import { useEffect, useState } from "react"

function NoteForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [category, setCategory] = useState("Personal")

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "")
            setText(initialData.text)
            setCategory(initialData.category)
        }
    }, [initialData])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return

        const note = {
            id: initialData?.id || Date.now(),
            title,
            text,
            category,
            createdAt: initialData?.createdAt || new Date(),
            updatedAt: initialData ? new Date() : null
        }

        onSubmit(note)
        if (!initialData) {
            setTitle("")
            setText("")
            setCategory("Personal")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Title (optional)"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <textarea
                rows={Math.max(3, text.split("\n").length)}
                placeholder="Write your note..."
                value={text}
                onChange={e => setText(e.target.value)}
                style={{ width: "100%", resize: "none" }}
            />

            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option>Personal</option>
                <option>Work</option>
                <option>Other</option>
            </select>

            <button>{initialData ? "Update" : "Add"} Note</button>
        </form>
    )
}

export default NoteForm
