import React from 'react'
import Intro from './Intro'
import Quiz from './Quiz'
import './App.css'
import yellowblob from './assets/yellowblob.svg'
import blueblob from './assets/blueblob.svg'

function App() {
  const [startQ, setStartQ] = React.useState(true)

  return (
    <div>
      <div className="rtblob" style={{backgroundImage: `url(${yellowblob})`}}></div>
      <div className="blblob" style={{backgroundImage: `url(${blueblob})`}}></div>
      {startQ ? <Intro handleClick={setStartQ} /> : <Quiz />}
    </div>
  )
}

export default App
