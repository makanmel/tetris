import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { moment } from "moment";
import "./GameList.css";

const Item = ({ data: { name, points, time, finished } }) => (
  <Fragment>
    <div className="name">Name: {name}</div>
    <div className="result">Points: {points}</div>
    <div className="time">Time: {time}</div>
    <div className="saved-on">
      Saved: {moment(finished).format("DD MMM YY, HH:MM:SS")}
    </div>
  </Fragment>
);

const GameList = ({ data, load }) => (
  <div className="game-list">
    <ol>
      {data.map(({ id, ...rest }) => (
        <li key={id}>
          {load ? (
            <Link to={`/game/${id}`} className="wrapper">
              <Item data={rest} />
            </Link>
          ) : (
            <div className="wrapper">
              <Item data={rest} />
            </div>
          )}
        </li>
      ))}
    </ol>
  </div>
);

export default GameList;
