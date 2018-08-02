import React from 'react';
import queryString from 'query-string';
import api from "../util/api.js";


export class Results extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (players) {
      if (players === null) {
         this.setState({
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
        });
      }

      this.setState({
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false,
      });
    }.bind(this));
  }
  
  render() {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;

    return(
      <div>Results</div>
    )
  }
}