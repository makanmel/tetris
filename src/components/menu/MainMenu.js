import React from "react";

import Menu, { Link } from "./Menu";

export default () => (
  <Menu>
    <Link to="/game">New Game</Link>
    <Link to="/load">Load Game</Link>
    <Link to="/leader-board">Hall Of Fame</Link>
  </Menu>
);
