import { Routes, Route, Link, Navigate, useMatch, useNavigate } from "react-router-dom"
import "./App.css"
import { useState } from "react"

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  )
}

const Note = (note) => {
  return (
    <div>
      <h2>{note.note.content}</h2>
      <h2>{note.note.user}</h2>
      <div>
        <strong>{note.note.important ? "important" : ""}</strong>
      </div>
    </div>
  )
}

const Notes = (notes) => {
  return (
    <div>
      <h2>Notes</h2>
      {notes && notes.notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </div>
  )
}

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (onLogin) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    onLogin.onLogin("gavin")
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ])
  const [user, setUser] = useState(null)
  const match = useMatch("/notes/:id")

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
  }

  const padding = { padding: "5px" }

  return (
    <>
      <Link to="/" style={padding}>
        Home
      </Link>
      <Link to="/notes" style={padding}>
        Notes
      </Link>
      {user ? (
        <em>{user}</em>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
      <Link to="/users" style={padding}>
        Users
      </Link>

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
    </>
  )
}

export default App
