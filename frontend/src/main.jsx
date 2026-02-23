import ReactDOM from 'react-dom/client'
import App from './App'

export const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  )
}

export const Notes = () => {
  return (
    <div>
      <h2>Notes</h2>
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
