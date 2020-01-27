import React from 'react'
import './Welcome.css'

const Welcome = props => {
    if (props.menu) {
        return (
            <div>
                <div className='game-name'>Word Game</div>
                <div onClick={props.changeDifficulty} className='select' id='select'>
                    <button className='diff-buttons' type='button' value='Easy'>Easy</button>
                    <button className='diff-buttons' type='button' value='Medium'>Medium</button>
                    <button className='diff-buttons' type='button' value='Hard'>Hard</button>
                </div>
               <p className='welcome-speech'>Welcome to my Word Game! <br />You must make a word with the 4 letters to gain a score and must get as much points as you can until the timer runs out.</p>
                {props.currentDifficulty && <p className='difficulty'>Difficulty: <span style={{fontWeight: "bold"}}>{props.currentDifficulty}</span></p>}
            </div>
        )
    } else {
        return null
    }
} 

export default Welcome