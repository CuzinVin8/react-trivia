import React from "react"
import { nanoid } from 'nanoid'
import Question from './Question'
import "./Quiz.css"

export default function Quiz(){
    const [quizQs, setQuizQs] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [newBoard, setNewBoard] = React.useState(true)
    const [errMsg, setErrMsg] = React.useState('')
    const [aced, setAced] =  React.useState(false)

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
            arr[i].chosen = false
            arr[i].id = nanoid()
            arr[i].aids = [nanoid(),nanoid(),nanoid(),nanoid()]
        }
        setQuizQs(arr)
    }

    function handleClick(anw, corr, grp){
        let newV = false;
        if(anw == corr){
            newV = true
        } else {
            newV = false;
        }
        
        setQuizQs(prevQuizQs => prevQuizQs.map(oldQ => {
            return oldQ.id === grp
                ? {...oldQ, chosen: newV }
                : oldQ
        }))

    }

    React.useEffect(function() {
        setQuizQs([])
        //console.log('api pull')
        fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple')
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
                group={item.id}
                handleClick={handleClick}
                isChosen={item.chosen}
                newID={item.aids}
            />
        )
    })

    function subQuiz(){
        /* check each to count number of anwered Q's */
        var cnt = document.getElementsByTagName("input");
        var t, f=0;
        for (t = 0; t < cnt.length; t++) {
            cnt[t].checked && f++;
        }

        /* submit if all are answered */
        if(f === quizQs.length){
            var x = document.getElementsByTagName("input");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].disabled = true;
            }

            setIsSubmitted(true)
            /* loop the state array to see which ones have correct chosen */
            var rig = document.getElementsByTagName("label");
            var h, w=0;
            for (h = 0; h < quizQs.length; h++) {
                quizQs[h].chosen == true && w++;
            }    
            const rights = w;

            rights === quizQs.length && setAced(true)

            setErrMsg(`You got ${rights}/${quizQs.length} answers correct`)
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
        setAced(false)
    }

    return (
        <div className="App">
            {showQs}
            
            <div className="btnHolder topPad">
                <div className="subMessage">{aced && '🎉🎉🎉'} {errMsg} {aced && '🎉🎉🎉'}</div>
                <button onClick={isSubmitted ? startOver : subQuiz}>
                {isSubmitted ? "Play Again" : "Check Answers"}
                </button>
            </div>
        </div>
    )
}