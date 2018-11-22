import React from "react";
const GameField = ({ wall = [], children }) => {
  let hasChildren = false;
  if (children) {
    hasChildren = true;
    if (children.length) {
      hasChildren = children.reduce((acc, child) => acc || child);
    }
  }

  return (
    <div className="game">
      <div className={`game-field ${hasChildren ? "blurred" : ""}`}>
        {wall.map((line, y) =>
          line.map((cell, x) => <Brick key={`${x}.${y}`} full={!!cell} />)
        )}
      </div>
      {hasChildren && <div className="overlay">{children}</div>}
    </div>
  );
};
export default GameField;
