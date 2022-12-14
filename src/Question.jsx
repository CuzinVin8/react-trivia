import React from 'react'

export default function Question(props) {
    let v=-1
    let finalAs = props.allAs.map(Ans => {
        let newClass = ''
        v = v + 1
        if(props.isSub && Ans == props.correct){ newClass = 'cGreen'}
        else if(props.isSub) { newClass = 'wFade' }
        
        return (
            <li key={Ans}>
                <input onChange={() => props.handleClick(Ans, props.correct, props.group)} className="ans" type="radio" id={props.newID[v]} name={props.group} value={Ans} />
                <div className={newClass}><label htmlFor={props.newID[v]}>{Ans.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&egrave;/g, "è").replace(/&rdquo;/g, '"').replace(/&ldquo;/g, '"').replace(/&aacute;/g, 'á').replace(/&ntilde;/g, 'ñ').replace(/&oacute;/g, 'ó').replace(/&eacute;/g, 'é').replace(/&hellip;/g, '…')}</label></div>
            </li>
        )
    })
    return (
        <div className="qSection">
            <h4>{props.quest.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&egrave;/g, "è").replace(/&rdquo;/g, '"').replace(/&ldquo;/g, '"').replace(/&aacute;/g, 'á').replace(/&ntilde;/g, 'ñ').replace(/&oacute;/g, 'ó').replace(/&eacute;/g, 'é').replace(/&hellip;/g, '…')}</h4>
            <ul className="answerHolder">
                {finalAs}
            </ul>
        </div>
    )
}