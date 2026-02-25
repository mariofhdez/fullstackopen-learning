import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from 'react-router-dom'
import { Home, Login, Note, Notes, Users } from './main'
import { useEffect, useState } from 'react'

import noteService from './services/notes'

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])

  const login = (user) => {
    setUser(user)
  }

  useEffect(() => {
    noteService.getAll().then((result) => setNotes(result))
  }, [])

  const match = useMatch('/notes/:id')
  const note = match ? notes.find((n) => n.id === match.params.id) : null

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>`{user} logged`</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </footer>
    </div>
  )
}

export default App
