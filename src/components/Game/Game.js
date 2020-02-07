import React from 'react'
import './Game.css'

let colour;

const Game = props => {
    // This if statement checks when the user had selected 4 letters
    // Once 4 letters are selected, it will reset the colour
    if ([...props.wordList].length === 4) {
        colour = ''
        setTimeout(() => {
            colour = undefined
        },50)
    }
    
    const renderLetter = () => {
        return props.wordLetters.map((letter, i) => {
            return <div key={i} onClick={props.getLetter.bind(this)} className='square' value={letter} style={{backgroundColor: colour}}>{letter}</div>
        })
    }
    
    if (props.word) {
        return (
        <div className='game' >
            {renderLetter()}
        </div>
        )
    } else if (props.gameOver=== true) {
        return (
            <>
                <div className='game-over'>Game Over</div>
                <p className='end-score'>You have scored <strong><em>{props.score}</em></strong> points...</p>
            </>
        )
    
} 
    else {
        return (
            null
        )
    }
}

export default Game;