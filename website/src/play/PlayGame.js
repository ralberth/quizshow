import React from 'react';
import MessageBus from "../common/MessageBus";
import appSyncClient from '../util/AppSyncClient';
import Loading from '../common/Loading';
import PlayerCurrentGame from './PlayerCurrentGame'
import PlayerLeaderboard from './PlayerLeaderboard'

class PlayGame extends React.Component {

    constructor({ match: { params: { gameId } }}) {
        super();
        this.gameId = gameId;
        this.bus = new MessageBus();
    }

    state = {
        game: null,
        question: null,
        mode: 'loading',
        contestants: []
    }

    componentDidMount = () => {
        appSyncClient.getGameById(this.gameId, game => {
            this.setState({
              mode: 'waiting',
              game: game
            });
        });
    }

    render() {

      switch(this.state.mode) {

        case 'loading':
            return <Loading />;

        case 'waiting':

          console.log('game:', this.state.game);

          return (
            <div >
              <PlayerCurrentGame title={this.state.game.title}/>
              <PlayerLeaderboard contestants={this.state.contestants} />
            </div>
          );

        case 'question':
            return (
              <div>
                Question Here
              </div>
            );

        default:
            return (<div>Something went wrong, bad value for Mode</div>);
        }
    }

}

export default PlayGame;
