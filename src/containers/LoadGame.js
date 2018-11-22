import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import GameList from "../components/GameList";
import Spinner from "../components/Spinner";
import { fetchGamesList } from "../redux/loadActions";

class LoadGame extends Component {
  componentWillMount() {
    this.props.fetchGameData();
  }

  render() {
    const { games, error, requestInProgress } = this.props;
    return (
      <div>
        {requestInProgress && <Spinner />}
        {error}
        <GameList data={games} load />
      </div>
    );
  }
}

const mapState = ({ loadGameState }) => ({ ...loadGameState });
const mapDispatcher = dispatcher =>
  bindActionCreators({ fetchGameData: fetchGamesList }, dispatcher);

export default connect(
  mapState,
  mapDispatcher
)(LoadGame);
