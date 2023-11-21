import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
  useNavigate,
} from "react-router-dom"
import "./App.css"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Alert,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  // Button,
  TextField,
} from "@mui/material"
import styled from "styled-components"

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

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

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes &&
              notes.notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                  </TableCell>
                  <TableCell>{note.user}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
    </div>
  )
}

const Login = (onLogin) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    onLogin.onLogin("gavin")
    navigate("/")
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type="password" />
        </div>
        <div>
          <Button type="submit">Login</Button>
        </div>
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
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const match = useMatch("/notes/:id")

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = { padding: "5px" }

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
          <em>user: {user} logged in</em>
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
    </Page>
  )
}

export default App
