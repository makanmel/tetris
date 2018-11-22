import React from "react";

const Brick = ({ full }) => <div className={`brick ${full ? "full" : ""}`} />;
export default Brick;
