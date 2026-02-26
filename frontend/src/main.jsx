import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import { Button, Form, Table } from 'react-bootstrap'

import './index.css'
import App from './App'

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
      <Table striped>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </td>
              <td>{note.user.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name='username' />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" name="password" />
        </Form.Group>
        <Button variant='primary' type="submit">login</Button>
      </Form>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
