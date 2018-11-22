import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchGameData, submitGameData } from "../redux/loadActions";
import { leaderReset, submitResult } from "../redux/leaderActions";
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  pauseGame,
  resetGame,
  setName,
  startGame,
  timer
} from "../redux/gameActions";
import Spinner from "../components/Spinner";
import NameForm from "../components/NameForm";
import PauseMenu from "../components/menu/PauseMenu";
import FinishMenu from "../components/menu/FinishMenu";
import { getWallWithFigure } from "../helpers/gameHelpers";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: props.name,
      id: props.match.params.id
    };
  }

  onNameChange = ({ target: { value } }) =>
    this.setState({
      name: value
    });

  onGameStart = () => this.props.setName(this.state.name);

  componentDidUpdate(prevProps) {
    const {
      name,
      points,
      time,
      paused,
      finished,
      startGame,
      timer,
      submitResult
    } = this.props;

    if (!prevProps.name && name) !this.state.id && startGame();

    if (prevProps.paused && !paused) this.gameTimer = setInterval(timer, 1000);

    if ((!prevProps.paused && paused) || finished)
      clearInterval(this.gameTimer);

    if (!prevProps.finished && finished) {
      submitResult({ name, points, time });
    }
  }

  interactionHandler = e => {
    const {
      moveUp,
      moveLeft,
      moveRight,
      moveDown,
      pauseGame,
      startGame,
      paused,
      name
    } = this.props;
    switch (e.key) {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowDown":
        moveDown();
        break;
      case "Escape":
        if (name)
          if (paused) startGame();
          else pauseGame();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    const { id } = this.state;
    document.documentElement.addEventListener(
      "keydown",
      this.interactionHandler
    );
    if (id) this.props.fetchGameData(id);
  }

  componentWillUnmount() {
    const { resetGame, leaderReset } = this.props;
    clearInterval(this.gameTimer);
    leaderReset();
    resetGame();
    document.documentElement.removeEventListener(
      "keydown",
      this.interactionHandler
    );
  }

  render() {
    const {
      wall,
      name,
      finished,
      paused,
      startGame,
      requestInProgress,
      leaderBoardSavingSuccess,
      loadGameSavingSuccess,
      submitGameData
    } = this.props;
    const { playerName, id } = this.state;
    if (!loadGameSavingSuccess) {
      return (
        <Game wall={wall}>
          {requestInProgress && <Spinner />}
          {!id && paused && !name && (
            <NameForm
              value={playerName}
              onChange={this.onNameChange}
              onStartGame={this.onGameStart}
            />
          )}
          {finished && leaderBoardSavingSuccess && <FinishMenu />}
          {paused && name && (
            <PauseMenu onResume={startGame} onSave={submitGameData} />
          )}
        </Game>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapState = ({
  gameState,
  gameState: { wall, figure, figurePosition },
  leaderBoardState: {
    requestInProgress: leaderBoardInProgress,
    savingSuccess: leaderBoardSavingSuccess,
    error: leaderBoardError
  },
  loadGameState: {
    requestInProgress: loadGameInProgress,
    savingSuccess: loadGameSavingSuccess,
    error: loadGameError
  }
}) => ({
  ...gameState,
  ...(figure ? { wall: getWallWithFigure(wall, figure, figurePosition) } : {}),
  requestInProgress: leaderBoardInProgress || loadGameInProgress,
  leaderBoardSavingSuccess,
  loadGameSavingSuccess,
  error: leaderBoardError || loadGameError
});

const mapDispatcher = dispatcher =>
  bindActionCreators(
    {
      setName,
      startGame,
      timer,
      moveUp,
      moveLeft,
      moveRight,
      moveDown,
      pauseGame,
      resetGame,
      submitResult,
      leaderReset,
      submitGameData,
      fetchGameData
    },
    dispatcher
  );

export default connect(
  mapState,
  mapDispatcher
)(withRouter(Game));
