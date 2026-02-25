import ReactDOM from 'react-dom/client'
import App from './App'
import {
  BrowserRouter as Router,
  Link,
  useNavigate} from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  )
}

export const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
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
        <div>
          username: <input type="text" />
        </div>
        <div>
          password: <input type="password" name="" id="" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
