import React from "react";
import "./NameForm.css";

export default ({ value, onChange, onStartGame }) => (
  <form
    className="name-form"
    onSubmit={e => {
      e.preventDefault();
      onStartGame();
    }}
  >
    <label htmlFor="player-name">Your Name:</label>
    <input
      type="text"
      id="player-name"
      value={value}
      onChange={onChange}
      required
    />
    <button>Play</button>
  </form>
);
