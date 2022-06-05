import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import lottie from "lottie-web";
import data from "./celebration.json";


const App = () => {

    //Function for generating random dice values
    const generateNewDice = () => {
        return {
            value: Math.ceil((Math.random() * 6)),
            isHeld: false,
            id: nanoid()
         }
    }

    //Function for creating 10 dice components
    const allNewDice = () => {
        const newDice = [] ;
        for(let i = 1; i <= 10; i++){
            newDice.push(generateNewDice())
        }
        return newDice;
    }

    const [allDice, setAllDice]= React.useState(allNewDice)
    const [tenzies, setTenzies]= React.useState(false)

    //Function for passing values in each dice component 
    const dice = allDice.map(die => <Dice 
        key= {die.id}
        faceValue = {die.value}
        held = {die.isHeld}
        holdDice = {() => holdDice(die.id)}
        />)

        //Function for generating new values on every call
        const rollDice = () => {
            if(tenzies === false){
            setAllDice(prevState => prevState.map(die => {
                return die.isHeld ? die : generateNewDice()
            }
            ))}
            else {
                setAllDice(allNewDice);
                setTenzies(false);
            }
        }

        //Function for holding dice value on call
        const holdDice = (id) => {
            setAllDice(prevState => prevState.map(die => {
              return die.id === id ? {...die, isHeld: !die.isHeld} : {...die} ;
            }))
        }

        //Consideration of all conditions required for win
        React.useEffect(() => {
            const heldResult = allDice.every(die => die.isHeld)
            const randomValue = allDice[0].value
            const valueResult = allDice.every(die => die.value === randomValue);
            if(heldResult && valueResult) {
                setTenzies(true)
            }
        },[allDice])

        //Storing the component ref in variable
        let animationcontainer = React.useRef(null)

        //Animation visualising
        React.useEffect(() =>{
            lottie.loadAnimation({
                container: animationcontainer.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: data
            })
        },[tenzies])

        

    return(
        <main className="container" >
            <h1 className="header-text">Tenzies</h1>
            {tenzies && <h2 className="win-text animate__animated animate__tada animate__infinite">Congratulations On Your Win...</h2>}
            {tenzies ? <div className="confetti" ref={animationcontainer}></div> : <p className="instruction"><strong>INSTRUCTION: </strong> Roll until all dice have the same number.<br>
            </br> Click on the dice to lock the dice at the number you want.</p>}
            <div className="dice-set">
            {dice}
            </div>
            <button onClick={rollDice} className="roll-button">{tenzies ? "New Game" : "Roll On"}</button>
            {/* <footer><span className="footer-text">Developed by <a href="https://github.com/TuhinBanerjee31">Tuhin Banerjee</a></span></footer> */}
        </main>
    )
}

export default App;