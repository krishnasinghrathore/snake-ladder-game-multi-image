// Manages player-specific logic and UI
import React from "react";

const Player = ({ id, position, scores, isCurrentPlayer, color }) => {
  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  return (
    <div
      style={{
        padding: "10px",
        border: isCurrentPlayer ? "2px solid #ffcc00" : "none",
        borderRadius: "5px",
        marginBottom: "10px",
        backgroundColor: isCurrentPlayer ? "#f0f0f0" : "transparent",
      }}
    >
      {isCurrentPlayer && <span style={{ color: "#ffcc00" }}> 🔴 </span>}
      <strong style={{ color }}>{`Player ${id} (P${id})`}</strong>
      <div>
        <strong>Position:</strong> {position}
      </div>
      <div>
        <strong>Scores:</strong> {scores.join(", ")} (Total: {totalScore})
      </div>
    </div>
  );
};

export default Player;
