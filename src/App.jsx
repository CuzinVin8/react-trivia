import React from 'react'
import Intro from './Intro'
import Quiz from './Quiz'
import './App.css'

function App() {
  const [startQ, setStartQ] = React.useState(true)

  return (
    startQ ? <Intro handleClick={setStartQ} /> : <Quiz />
  )
}

export default App
