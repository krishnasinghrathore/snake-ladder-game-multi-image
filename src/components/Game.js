import React, { useState } from "react";
import Board from "./Board";
import Dice from "./Dice";
import Player from "./Player";

const snakesAndLadders = {
  snakes: { 17: 7, 54: 34, 62: 19, 98: 79 },
  ladders: { 3: 22, 5: 8, 20: 29, 27: 1, 45: 75, 70: 91, 79: 99 },
};

// Define an array of distinct colors
const playerColors = [
  "#4A235A", // Dark Purple
  "#1F618D", // Dark Blue
  "#A93226", // Dark Red
  "#C39BD3", // Dark Lavender
  "#1D8348", // Dark Green
];

const Game = () => {
  const [numPlayers, setNumPlayers] = useState(2); // Default to 2 players
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const initializePlayers = () => {
    const initialPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      position: 0,
      scores: [],
      color: playerColors[i], // Use distinct colors from the array
      consecutiveSixes: 0,
    }));
    setPlayers(initialPlayers);
    setCurrentPlayerIndex(0);
    setMessage("");
    setGameStarted(true);
  };

  const handleDiceRoll = (roll) => {
    let player = players[currentPlayerIndex];
    let newPosition = player.position;

    // Starting condition (must roll a 6 to start moving)
    if (player.position === 0 && roll === 6) {
      newPosition = roll;
    } else if (player.position > 0) {
      newPosition += roll;
    }

    // Check for snakes and ladders
    let finalPosition = newPosition;
    if (snakesAndLadders.snakes[finalPosition]) {
      finalPosition = snakesAndLadders.snakes[finalPosition];
      setMessage(`Player ${player.id} was bitten by a snake!`);
    } else if (snakesAndLadders.ladders[finalPosition]) {
      finalPosition = snakesAndLadders.ladders[finalPosition];
      setMessage(`Player ${player.id} climbed a ladder!`);
    }

    // Handle consecutive sixes rule
    let consecutiveSixes = roll === 6 ? player.consecutiveSixes + 1 : 0;
    if (consecutiveSixes === 3) {
      finalPosition = player.position;
      consecutiveSixes = 0;
      setMessage(
        `Player ${player.id} rolled three sixes in a row, skipping turn!`
      );
    }

    // Update player position if within board limits (<= 100)
    const updatedPlayer = {
      ...player,
      position: finalPosition > 100 ? player.position : finalPosition,
      scores: [...player.scores, roll],
      consecutiveSixes,
    };

    const updatedPlayers = players.map((p, idx) =>
      idx === currentPlayerIndex ? updatedPlayer : p
    );

    setPlayers(updatedPlayers);

    // Check if the player won
    if (finalPosition === 100) {
      setMessage(`Player ${player.id} wins!`);
      setGameStarted(false); // Stop game after win
      return;
    }

    // Move to the next player if the player didn't roll a six or rolled three sixes
    if (roll !== 6 || consecutiveSixes === 3) {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
    }
  };

  return (
    <div className="game">
      <h1>Snake and Ladder Game</h1>
      <div className="setup">
        <label>
          Number of Players (1-5):
          <input
            type="number"
            min="1"
            max="5"
            value={numPlayers}
            onChange={(e) =>
              setNumPlayers(Math.max(1, Math.min(5, +e.target.value)))
            }
          />
        </label>
        <button onClick={initializePlayers}>Start Game</button>
      </div>

      {players.length > 0 && (
        <>
          <div className="container">
            <Board
              players={players}
              currentPlayer={players[currentPlayerIndex].id}
              snakesAndLadders={snakesAndLadders}
            />
            <div className="controls">
              <Dice onRoll={handleDiceRoll} disabled={!gameStarted} />
              <div className="message">
                {message ||
                  `It's Player ${players[currentPlayerIndex].id}'s turn!`}
              </div>
              <div className="scores">
                <div className="player-info">
                  {players.map((p) => (
                    <Player
                      key={p.id}
                      id={p.id}
                      position={p.position}
                      scores={p.scores}
                      isCurrentPlayer={p.id === players[currentPlayerIndex].id}
                      color={p.color} // Pass color prop to Player
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
