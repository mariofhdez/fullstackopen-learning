import ReactDOM from 'react-dom/client'
import App from './App'
import { Link, useParams } from 'react-router-dom'

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

export const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find((n) => n.id === id)
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

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
