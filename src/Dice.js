import React from "react";

const Dice =(props) => {
    return(
        <div >
            <p className="dice"
            style={{background: props.held ? "cadetblue" : "rgb(229, 183, 128)"}}
            onClick={props.holdDice}>{props.faceValue}</p>
        </div>
    )
}

export default Dice;