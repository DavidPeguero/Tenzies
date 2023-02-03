import Die from "./components/Die"
import React from "react"
import Confetti from 'react-confetti'

function App() {
  const DIE_NUM = 10;
  const [dice, setDice] = React.useState(() => newDice())
  const [tenzies, setTenzies] = React.useState(false)

  //Check for win condition and set win if achieved
  React.useEffect(()=> {
    checkTenzies();
  }, [dice])

  //Loads a new set of dice 
  function newDice(){
    let newArray = []
    for(let i = 0; i < DIE_NUM; i++){
      newArray.push({
        id : i + 1,
        value : Math.floor(Math.random() * (DIE_NUM)) + 1,
        held : false
      })
    }
    return newArray
  }

  //Toggles freezing for dice
  function freeze(freezeId){
    setDice(oldDice => oldDice.map(
      dice => dice.id === freezeId ?  {...dice, held : !dice.held} : {...dice}))
  }

  //Rolls dice if not frozen
  function rollDice(){
    setDice(oldDice => oldDice.map(dice =>
      dice.held ? dice : {...dice, value : Math.floor(Math.random() * (DIE_NUM)) + 1}
    ))
  }
  
  //Set to a new game state
  function newGame(){
    setDice(newDice());
    setTenzies(false)
  }

  //Checks and sets if tenzies is achieved
  function checkTenzies(){
    setTenzies(dice.every((die) => die.value === dice[0].value && die.held === true))
  }

  //Create dice elements on dice change
  const diceElements = dice.map(die => 
    <Die 
    key={die.id}  
    value={die.value}
    held={die.held}
    id={die.id}
    freeze={freeze}
    />
  )


  
  return (
    <main>
      {tenzies && <Confetti></Confetti>}
      <h1 className="game-title">Tenzies</h1>
      <p className="game-text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="roll" onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
