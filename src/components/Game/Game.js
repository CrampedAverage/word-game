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
    if (props.word) {
        return (
        <div className='game' onClick={props.getLetter}>
            <div lett="1" className='square' value={props.wordOne} onClick={props.try} style={{backgroundColor: colour}}>{props.wordOne}</div>
            <div lett="2" className='square' value={props.wordTwo} onClick={props.try} style={{backgroundColor: colour}}>{props.wordTwo}</div>
            <div lett="3" className='square' value={props.wordThree} onClick={props.try} style={{backgroundColor: colour}}>{props.wordThree}</div>
            <div lett="4" className='square' value={props.wordFour} onClick={props.try} style={{backgroundColor: colour}}>{props.wordFour}</div>
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