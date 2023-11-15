import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  )
}

const Notes = () => {
  return <div>Notes</div>
}

const Users = () => {
  return <div>Users</div>
}

const App = () => {
  const padding = { padding: "5px" }

  return (
    <Router>
      <Link to="/" style={padding}>
        Home
      </Link>
      <Link to="/notes" style={padding}>
        Notes
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
