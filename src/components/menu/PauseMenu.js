import React from "react";
import Menu, { Link, Button } from "./Menu";

const PauseMenu = ({ onResume, onSave }) => (
  <Menu>
    <Button onClick={onResume}>Continue</Button>
    <Button onClick={onSave}>Save & Close</Button>
    <Link to="/">Main Menu</Link>
  </Menu>
);

export default PauseMenu;
