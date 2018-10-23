import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Game from "../components/GameField/GameField";
import PlayerNameForm from "../components/PlayerNameForm/PlayerNameForm";
import PauseMenu from "../components/Menu/PauseMenu";

import {
  setPlayerName,
  startGame,
  pauseGame,
  timerTick,
  figureRotate,
  moveFigureLeft,
  moveFigureRight,
  moveFigureDown
} from "../redux/actions/gameActions";
import { getWallWithFigure } from "../helpers/gameHelpers";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.playerName
    };
  }

  playerNameChangeHandler = ({ target: { value } }) =>
    this.setState({
      name: value
    });

  startGameClickHandler = () => this.props.setPlayerName(this.state.name);

  componentDidUpdate(prevProps) {
    const { playerName, startGame, timerTick, paused, finished } = this.props;
    if (!prevProps.playerName && playerName) {
      startGame();
    }
    if (prevProps.paused && !paused) {
      this.gameTimer = setInterval(timerTick, 1000);
    }
    if (paused && !prevProps.paused) {
      clearInterval(this.gameTimer);
    }
    if ((paused && !prevProps.paused) || finished) {
      clearInterval(this.gameTimer);
    }
  }

  interactionHandler = e => {
    const {
      paused,
      startGame,
      pauseGame,
      moveFigureLeft,
      moveFigureRight,
      moveFigureDown,
      figureRotate
    } = this.props;

    switch (e.key) {
      case "ArrowUp":
        figureRotate();
        break;
      case "ArrowLeft":
        moveFigureLeft();
        break;
      case "ArrowRight":
        moveFigureRight();
        break;
      case "ArrowDown":
        moveFigureDown();
        break;
      case "Escape":
        if (paused) {
          startGame();
        } else {
          pauseGame();
        }
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.documentElement.addEventListener(
      "keydown",
      this.interactionHandler
    );
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener(
      "keydown",
      this.interactionHandler
    );
  }

  render() {
    const { wall, playerName, paused, startGame } = this.props;
    const { name } = this.state;

    return (
      <Game wall={wall}>
        {paused &&
          !playerName && (
            <PlayerNameForm
              value={name}
              onChange={this.playerNameChangeHandler}
              onStartGame={this.startGameClickHandler}
            />
          )}
        {paused && playerName && <PauseMenu onResume={startGame} />}
      </Game>
    );
  }
}

const mapStateToProps = ({ gameState }) => {
  const {
    wall,
    playerName,
    paused,
    finished,
    figure,
    figurePosition
  } = gameState;
  return {
    wall: figure ? getWallWithFigure(wall, figure, figurePosition) : wall,
    playerName,
    paused,
    finished
  };
};

const mapDispatchToProps = dispatcher =>
  bindActionCreators(
    {
      setPlayerName,
      startGame,
      pauseGame,
      timerTick,
      moveFigureLeft,
      moveFigureRight,
      moveFigureDown,
      figureRotate
    },
    dispatcher
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
