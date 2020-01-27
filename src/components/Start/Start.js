import React from 'react'
import './Start.css'

const Start = props => {
    if (props.gameStart === false && props.menu === true) {
        return (
            <div>
                <button className='start' onClick={props.start}>Start</button>
            </div>
        )
        } else if (props.gameStart === true) {
            return (
                <div className='game-buttons'>
                    <button className='end' onClick={props.end}>End</button>
                    <button className='restart' onClick={props.restart}>Return Menu</button>
                </div>
            )
        } else {
            return (
                <div className='game-buttons'>
                    <button className='end' onClick={props.start}>Start</button>
                    <button className='restart' onClick={props.restart}>Return Menu</button>
                </div>
            )
        }

}

export default Start