// Simulates dice rolls
import React from "react";
import diceImage from "./images/dice.png"; // Add the path to your snake image

const Dice = ({ onRoll, disabled }) => {
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    onRoll(roll);
  };

  return (
    <button onClick={rollDice} disabled={disabled} className="roll-button">
      <img src={diceImage} alt="Dice" className="dice-image" />
      Roll Dice
    </button>
  );
};

export default Dice;
