import React from 'react'
import './Score.css'

const Score = props => {
    if (props.start === true) {
        return (
            <div className='all'>
                <div className='score-time'>
                    <div>Score: <strong>{props.score}</strong></div>
                    <div className='time'>Time: <strong>{props.timeSelected}</strong></div>
                </div>
                <div className='word'>{props.wordSelected}</div>
            </div>
        )
    } else {
        return (
            null
        )
    }


}

export default Score
