import React from "react";
import Menu, { Link, Button } from "./Menu";

export default ({ onResume }) => (
  <Menu>
    <Button onClick={onResume}>Продовжити</Button>
    <Link href="#">головне меню</Link>
  </Menu>
);
