import React from "react"
import { nanoid } from 'nanoid'
import Question from './Question'
import "./Quiz.css"

export default function Quiz(){
    const [quizQs, setQuizQs] = React.useState([])
    const [quizAs, setQuizAs] = React.useState([])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    React.useEffect(function() {
        console.log('api pull')
        fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=hard&type=multiple')
            .then(response => response.json())
            .then(data => setQuizQs(data.results));
    }, [] )

    
    const showQs = quizQs.map(item => {
        const newQs = item.correct_answer
        const newAs = item.incorrect_answers
        newAs.push(newQs)
        shuffleArray(newAs)
        return (
            <Question 
                key={item.question} 
                quest={item.question} 
                allAs={newAs} 
                correct={newQs}
                group={nanoid()}
            />
        )
    })

    return (
        <div>
            {showQs}
        </div>
    )
}