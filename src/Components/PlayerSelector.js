import React from "react";

export const PlayerSelector = props => {
  return (
    <div className="player-selector">
      <div className={"player-text"}>Players:</div>
      {props.players.map(index => (
        <div
          key={index}
          className={`player-item ${
            props.playerCount === index ? "selected" : ""
          } ${!props.isTitans && index === 6 ? "disabled" : ""}`}
          onClick={() => props.setPlayerCount(index)}
        >
          {index}
        </div>
      ))}
    </div>
  );
};
