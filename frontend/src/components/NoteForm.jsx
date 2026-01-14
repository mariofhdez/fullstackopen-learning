import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Type your note"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm
