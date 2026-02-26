import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from 'react-router-dom'
import { Home, Login, Note, Notes, Users } from './main'
import { useEffect, useState } from 'react'

import noteService from './services/notes'
import {
  Alert,
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
} from '@mui/material'

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  useEffect(() => {
    noteService.getAll().then((result) => {
      setNotes(result)
    })
  }, [])

  const match = useMatch('/notes/:id')
  const note = match ? notes.find((n) => n.id === match.params.id) : null

  const padding = {
    padding: 5,
  }

  return (
    <Container>
      {message && <Alert severity="success">{message}</Alert>}
      <AppBar position="static">
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Toolbar>
          <Button color="inherit" component={Link}>
            home
          </Button>
          <Button color="inherit" component={Link}>
            notes
          </Button>
          <Button color="inherit" component={Link}>
            users
          </Button>
          <Button color="inherit" component={Link}>
            {user ? <em>{user} logged</em> : login}
          </Button>
        </Toolbar>
      </AppBar>

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
    </Container>
  )
}

export default App
