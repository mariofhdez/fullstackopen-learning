import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, Note, Notes, Users } from './main'
import { useEffect, useState } from 'react'

import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    noteService.getAll().then((result) => setNotes(result))
  }, [])

  const padding = {
    padding: 5,
  }

  return (
    <Router>
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
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}

export default App
