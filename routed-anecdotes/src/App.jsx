import { useState, useEffect } from "react"
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom"
import { useField, useCountry } from "../hooks"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
      <Link to="/country" style={padding}>
        country
      </Link>
    </div>
  )
}

const AnecdoteList = (anecdotes) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const Anecdote = (anecdote) => {
  return (
    <div>
      <h2>
        {anecdote.anecdote.content} by {anecdote.anecdote.author}
      </h2>
      <p>has {anecdote.anecdote.votes} votes</p>
      <p>
        for more info see{" "}
        <a href={anecdote.anecdote.info}>{anecdote.anecdote.info}</a>
      </p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
)

const CreateNew = (addNew) => {
  const { reset: cReset, ...content } = useField("content")
  const { reset: aReset, ...author } = useField("author")
  const { reset: iReset, ...info } = useField("info")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate("/")
  }

  const handleReset = (e) => {
    e.preventDefault()
    cReset()
    aReset()
    iReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const Country = () => {
  const { reset, ...countryInput } = useField("text")
  const [name, setName] = useState("")
  const { country, isError } = useCountry(name)

  const handleSubmit = (e) => {
    e.preventDefault()
    setName(countryInput.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...countryInput} />
        <button>find</button>
      </form>

      {country && !isError ? (
        <div>
          <h3>{country?.name?.common} </h3>
          <div>capital {country?.capital[0]} </div>
          <div>population {country?.population}</div>
          <div style={{width: '200px'}}>{country?.flag}</div>
        </div>
      ) : (
        <div>{name} not found...</div>
      )}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState("")

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
  }

  const match = useMatch("/anecdote/:id")

  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification("")
    }, [5000])

    return () => clearTimeout(timer)
  }, [notification])

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && (
        <div style={{ border: "1px solid red" }}>{notification}</div>
      )}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdote/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/country" element={<Country />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
