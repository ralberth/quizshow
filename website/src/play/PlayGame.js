import React from 'react';
import MessageBus from "../common/MessageBus";
import appSyncClient from '../util/AppSyncClient';
import Loading from '../common/Loading';
import PlayerCurrentGame from './PlayerCurrentGame'
import Leaderboard from '../common/Leaderboard'

const people = [
  {
      name: 'Rich',
      login: 'ralberth',
      organization: 'Amazon'
  },
  {
      name: 'Chris',
      login: 'csmith',
      organization: 'Foobar'
  },
  {
      name: 'Sue',
      login: 'suesue',
      organization: 'Barbaz'
  }
];

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
        contestants: people
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
            <div>
              <PlayerCurrentGame title={this.state.game.title}/>
              <Leaderboard contestants={this.state.contestants}
              />
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
