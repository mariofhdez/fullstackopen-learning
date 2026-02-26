import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'

import './index.css'
import App from './App'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Button
} from '@mui/material'

export const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ducimus
        maiores! Alias, itaque quod. Distinctio, deserunt animi! Molestiae
        debitis doloribus perspiciatis impedit neque voluptate praesentium,
        ducimus, odio quam vitae quo! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Dolore error laudantium, tempore quisquam consequatur
        eum adipisci sapiente corrupti. Quasi dolorum iste provident quis
        quibusdam accusamus voluptas cupiditate deserunt corporis atque!
      </p>
    </div>
  )
}

export const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>{note.user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export const Note = ({ note }) => {
  console.log(note)
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user.usename}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  )
}

export const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

export const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    props.onLogin('admin')
    navigate('/')
  }
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <TextField label="username" type="text" name="username" />
        <TextField label="password" type="password" name="password" />
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
