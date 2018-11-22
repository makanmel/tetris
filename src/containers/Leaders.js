import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import GameList from "../components/GameList";
import { fetchLeaders } from "../redux/leaderActions";
import Spinner from "../components/Spinner";

class LeaderBoardContainer extends Component {
  componentWillMount() {
    this.props.fetchLeaderBoard();
  }

  render() {
    const { leaders, error, requestInProgress } = this.props;
    return (
      <div>
        {requestInProgress && <Spinner />}
        {error}
        <GameList data={leaders} />
      </div>
    );
  }
}

const mapState = ({ leaderBoardState }) => ({ ...leaderBoardState });
const mapDispatcher = dispatcher =>
  bindActionCreators({ fetchLeader: fetchLeaders }, dispatcher);

export default connect(
  mapState,
  mapDispatcher
)(LeaderBoardContainer);
