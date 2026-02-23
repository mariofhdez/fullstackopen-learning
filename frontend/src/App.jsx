import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
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
        {user
          ? <em>`${user} logged`</em>
          : ''
        }


      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<Login onLogin={login} />}/>
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}

export default App
