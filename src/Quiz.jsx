import React from "react"
import { nanoid } from 'nanoid'
import Question from './Question'
import "./Quiz.css"

export default function Quiz(){
    const [quizQs, setQuizQs] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [newBoard, setNewBoard] = React.useState(true)
    const [errMsg, setErrMsg] = React.useState('')

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function fixData(arr){
        for(let i=0;i<arr.length;i++){
            arr[i].incorrect_answers.push(arr[i].correct_answer)
            shuffleArray(arr[i].incorrect_answers) 
        }
        setQuizQs(arr)
    }

    React.useEffect(function() {
        console.log('api pull')
        fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=hard&type=multiple')
            .then(response => response.json())
            .then(data => fixData(data.results));
    }, [newBoard] )


    const showQs = quizQs.map(item => {
        return (
            <Question 
                key={item.question} 
                quest={item.question} 
                allAs={item.incorrect_answers} 
                correct={item.correct_answer}
                isSub={isSubmitted}
                group={nanoid()}
            />
        )
    })

    function subQuiz(){
        var cnt = document.getElementsByTagName("input");
        var t, f=0;
            for (t = 0; t < cnt.length; t++) {
                cnt[t].checked && f++;
            }
        if(f === quizQs.length){
            var x = document.getElementsByTagName("input");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].disabled = true;
            }
            setIsSubmitted(true)
            setErrMsg(`You got #/${quizQs.length} answers correct`)
        } else {
            setErrMsg(`Please answer all ${quizQs.length} questions.`)
        }
    }
    function startOver(){
        var x = document.getElementsByTagName("input");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].disabled = false;
        }
        setNewBoard(!newBoard)
        setErrMsg('')
        setIsSubmitted(false)
    }

    return (
        <div>
            {showQs}
            
            <div className="btnHolder topPad">
                <div className="subMessage">{errMsg}</div>
                <button onClick={isSubmitted ? startOver : subQuiz}>
                {isSubmitted ? "Play Again" : "Check Answers"}
                </button>
            </div>
        </div>
    )
}