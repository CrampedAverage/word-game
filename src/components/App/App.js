import React, { BrowserRouter as Router } from 'react';
import './App.css';
import wordObject from '../../word'

import Game from '../Game/Game'
import Start from '../Start/Start'
import Score from '../Score/Score'
import Welcome from'../Welcome/Welcome'

let thisTimer = undefined;
class App extends React.Component {
  state = {
    letterArray: [],
    start: false,
    score: 0,
    difficulty: undefined,
    time: undefined,
    word: undefined,
    wordOne: undefined,
    wordTwo: undefined,
    wordThree: undefined,
    wordFour: undefined,
    gameOver: false,
    mainMenu: true
  }
  
  // This function is responsible for starting the timer for the game
  startTimer = () => {
    if (this.state.start === false) {
      thisTimer = setInterval(() => {
        this.setState(state => {
          let time = state.time
          time -=1
          return {
            time
          }
        })
      }, 1000)
    }
  }

  // This function gets invoked whenever the user selects which difficulty they want
  difficultyChange = e => {
    const newDifficulty = e.target.value
    if (e.target.value === undefined) {
      return
    } else {
      this.setState(state => {
        let difficulty = state.difficulty
        difficulty = newDifficulty
        return {
          difficulty
        }
      })
    } 
  }

  // This is an onclick function which gets invoked whenever the user clicks on a letter
  getValue = e => {
    const letter = e.target.getAttribute('value')
    
    // This checks if the letter hasnt been selected yet
    // If it hasnt been selected then the colour will change to yellow and then mutate the letterArray
    if (e.target.style.backgroundColor === '' && e.target.getAttribute('class') !== 'game') {
      const letterSelected = e.target.getAttribute('value')
      e.target.style.backgroundColor = 'yellow'
      this.setState(state => {
        const letterArray = state.letterArray.concat(letterSelected);
        return {
          letterArray
        }
      })
    } 
    // If it has already been selected then the colour will change back to normal and get removed from the letterArray
    else { 
      e.target.style.backgroundColor = '' 
      this.setState(state => {
        const letterArray = state.letterArray.filter(e => {
          return e !== letter
        })
        return {
          letterArray
        }
      })
    }
  }

  // This is a function which is used whenever you need to change the word
  changeWord = () => {
    const randomWord = wordObject[Math.round(Math.random() * (wordObject.length - 1))]
    // This makes sure words are not repeated right after another

    if (randomWord.word === this.state.word) {
      this.changeWord()
    }
    this.setState({
      word: randomWord['word'],
      wordOne: randomWord['wordOne'],
      wordTwo: randomWord['wordTwo'],
      wordThree: randomWord['wordThree'],
      wordFour: randomWord['wordFour']
    })
  }

  // Starts the game and checks if you have selected a difficulty
  startGame = () => {
    // This is to validate whether the user has selected a difficulty
    if (this.state.difficulty === undefined) {
      alert('Please select a difficulty')
      return
    }
    // This switch case statement checks what difficult the user has selected when starting the game
    switch(this.state.difficulty) {
      case 'Easy':
          this.startTimer()
          this.setState({
            start: true,
            time: 30,
            gameState: true,
            score: 0,
            mainMenu: false
          })
          this.changeWord()
        break;
      case 'Medium':
          this.startTimer()
          this.setState({
            start: true,
            time: 20,
            gameState: true,
            score: 0,
            mainMenu: false
          })
          this.changeWord()
        break;
      case 'Hard':
          this.startTimer()
          this.setState({
            start: true,
            time: 10,
            gameState: true,
            score: 0,
            mainMenu: false
          })
          this.changeWord()
        break;
      default:
        break;
    }
  }

  // This ends the curent game you are in
  endGame = () => {
    clearInterval(thisTimer)
    this.setState({
      letterArray: [],
      start: false,
      time: undefined,
      word: undefined,
      wordOne: undefined,
      wordTwo: undefined,
      wordThree: undefined,
      wordFour: undefined,
      gameOver: true
    })
  }

  // Onclick function responsible for returning to menu
  restartGame = () => {
    clearInterval(thisTimer)
    this.setState({
      letterArray: [],
      difficulty: undefined,
      start: false,
      time: undefined,
      word: undefined,
      wordOne: undefined,
      wordTwo: undefined,
      wordThree: undefined,
      wordFour: undefined,
      gameOver: false,
      mainMenu: true
    })
  }


  render() {
    // Checks whether the time has reached 0 and then ends game
    if (this.state.time === 0) {
      clearInterval(thisTimer)
      this.endGame()
    }

    // Checks when the user has selected 4 letters
    if (this.state.letterArray.length === 4) {
      // It then validates whether it is the right word or not
      if (this.state.letterArray.join('') === this.state.word) {
        // If it is the right word then the game will change word and give the user a point
        this.changeWord()
        setTimeout(() => {
          this.setState(state => {
            let score = state.score += 1
            let letterArray = state.letterArray
            let time = state.time += 2
            letterArray = []
            return {
              time,
              score,
              letterArray
            } 
          })
        }, 100)
      }
      // If it is the wrong word then the letterArray gets reset 
      else {
        setTimeout(() => {
          this.setState({
            letterArray: []
          })
        }, 100)
      }
    }
    return (
      <>
        <div className='top-gradient' />
        <div className='bot-gradient' />
        <div className='App'>
        <Welcome menu={this.state.mainMenu} changeDifficulty={this.difficultyChange} currentDifficulty={this.state.difficulty}/>
        <header className='Score'>
        <Score wordSelected={this.state.letterArray} 
        timeSelected={this.state.time} 
        start={this.state.start} 
        score={this.state.score}
        difficulty={this.state.difficulty}/> 
        </header>
        <div className='Game'>
          <Game 
          wordList={this.state.letterArray}
          getLetter= {this.getValue}
          word={this.state.word}
          wordOne={this.state.wordOne}
          wordTwo={this.state.wordTwo}
          wordThree={this.state.wordThree}
          wordFour={this.state.wordFour}
          gameOver={this.state.gameOver}
          score={this.state.score}
          />
        </div>
        <Start
        gameStart={this.state.start} 
        start = {this.startGame}
        end = {this.endGame}
        restart={this.restartGame}
        menu={this.state.mainMenu}/>
        </div>
      </>
    )
  }
}

export default App;