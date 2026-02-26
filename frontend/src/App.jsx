import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import { Button, Home, Login, Note, Notes, Users } from './main'
import { useEffect, useState } from 'react'

import noteService from './services/notes'
import { Alert, AppBar, Container, IconButton, Toolbar } from '@mui/material'

import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

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
    <Page>
      {message && <Alert severity="success">{message}</Alert>}

      <Navigation>
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
      </Navigation>

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

      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </Footer>
    </Page>
  )
}

export default App
