import React from 'react'

export default function Question(props) {
    
    let finalAs = props.allAs.map(Ans => {
        let newClass = ''
        
        if(props.isSub && Ans == props.correct){ newClass = 'cGreen'}
        else if(props.isSub) { newClass = 'wFade' }
        
        return (
            <li key={Ans}>
                <input onChange={() => props.handleClick(Ans, props.correct, props.group)} className="ans" type="radio" id={Ans} name={props.group} value={Ans} />
                <div className={newClass}><label htmlFor={Ans}>{Ans.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&egrave;/g, "è")}</label></div>
            </li>
        )
    })
    return (
        <div className="qSection">
            <h4>{props.quest.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&egrave;/g, "è")}</h4>
            <ul className="answerHolder">
                {finalAs}
            </ul>
        </div>
    )
}