import React from "react"
import './Intro.css'

export default function Intro(props){
    return (
        <div className="App">
            <h1>Movie Trivia</h1>
            <h3>Are you a movie buff? Let's find out!</h3>
            <div className="btnHolder">
                <button onClick={() => props.handleClick(false)}>
                Start Trivia
                </button>
            </div>
        </div>
    )
}