import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = props => {
  // notes is an initial value, passed by props.
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('an error happened...')

  const hook = () => {
    noteService.getAll().then(data => {
      setNotes(data)
    })
  }
  useEffect(hook, [])

  const toggleImportanceOf = id => () => {
    const note = notes.find(n => n.id === id)
    const newNote = { ...note, important: !note.important }

    // Set both the server and the client's state.
    noteService
      .update(id, newNote)
      .then(data => setNotes(notes.map(note => (note.id !== id ? note : data))))
      .catch(error => {
        setErrorMessage(
          `Note "${note.content}" was already deleted from server`
        )
        setTimeout(() => setErrorMessage(null), 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = event => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject).then(data => {
      setNotes(notes.concat(data))
      setNewNote('')
    })
  }

  const handleNoteChange = event => setNewNote(event.target.value)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf(note.id)}
          ></Note>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default App
