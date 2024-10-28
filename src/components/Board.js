import React from "react";
import "./Board.css";
import snakeImage from "./images/snake.png"; // Add the path to your snake image
import ladderImage from "./images/ladder.png"; // Add the path to your ladder image

const Board = ({ players, snakesAndLadders }) => {
  const renderSquare = (index) => {
    const snakeDestination = snakesAndLadders.snakes[index];
    const ladderDestination = snakesAndLadders.ladders[index];
    const playersOnSquare = players.filter((p) => p.position === index);

    return (
      <div
        key={index}
        className={`square ${
          snakeDestination ? "snake" : ladderDestination ? "ladder" : ""
        }`}
      >
        {/* Display players on the square */}
        {playersOnSquare.length > 0 ? (
          playersOnSquare.map((player) => (
            <span
              key={player.id}
              style={{
                backgroundColor: player.color,
                color: "white",
                padding: "2px 4px",
                borderRadius: "50%",
                margin: "0 2px",
              }}
            >
              P{player.id}
            </span>
          ))
        ) : (
          <span>
            {snakeDestination ? "" : ladderDestination ? "" : index}
            {snakeDestination && (
              <span className="position-number down">{snakeDestination}</span>
            )}
            {ladderDestination && (
              <span className="position-number up">{ladderDestination}</span>
            )}
          </span>
        )}
        {/* Render snake or ladder images if applicable */}
        {snakeDestination && (
          <img src={snakeImage} alt="Snake" className="snake-image" />
        )}
        {ladderDestination && (
          <img src={ladderImage} alt="Ladder" className="ladder-image" />
        )}
      </div>
    );
  };

  return (
    <div className="board">
      {[...Array(100)].map((_, i) => renderSquare(100 - i))}
    </div>
  );
};

export default Board;
