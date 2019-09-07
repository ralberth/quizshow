import React, { useState } from 'react';
import Leaderboard from '../common/Leaderboard';
import Loading from '../common/Loading';
import PlayerCurrentGame from './PlayerCurrentGame';
// import { getGameByIdGQL } from "../util/graphqlQueries";
import ContestantQuestion from './ContestantQuestion';

const people = [
  {
      name: 'Rich',
      login: 'ralberth',
      organization: 'Amazon',
      points: 500
  },
  {
      name: 'Chris',
      login: 'csmith',
      organization: 'Foobar',
      points: 3250
  },
  {
      name: 'Sue',
      login: 'suesue',
      organization: 'Barbaz',
      points: 35856
  }
];

const PlayGame = ({ match: { params: { gameId } }}) => {

    const [state] = useState({
        // game: null,
        game: {
          title: 'The Game Title'
        },
        question: null,
        mode: 'question',
        contestants: people
    });

    // const { loading, data: { getGameById: game } } = useAppSyncQuery(getGameByIdGQL, { id: gameId });

    // if (!loading) {
    //   setState({
    //       mode: 'waiting',
    //       game: game
    //     })
    // }

    switch(state.mode) {

      case 'loading':
          return <Loading />;

      case 'waiting':

        return (
          <div>
            <PlayerCurrentGame title={state.game.title}/>
            <Leaderboard contestants={state.contestants}
            />
          </div>
        );

      case 'question':
          return (
            <div>
              <ContestantQuestion />
            </div>
          );

      default:
          return (<div>Something went wrong, bad value for Mode</div>);
      }

}

export default PlayGame;
