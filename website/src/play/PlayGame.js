import React, { useState } from 'react';
import Leaderboard from '../common/Leaderboard';
import Loading from '../common/Loading';
import PlayerCurrentGame from './PlayerCurrentGame';
import ContestantQuestion from './ContestantQuestion';
import { useAppSyncQuery, useAppSyncSubs } from "../graphql/useAppSyncHooks";
import { GET_GAME_BY_ID_GQL, SUB_QUESTION_STATE_CHANGE_GQL } from "../graphql/graphqlQueries";
import appSyncClient from '../graphql/AppSyncClient';

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

    const [state, setState] = useState({
        question: null,
        mode: "waiting",
        buzzDisabled: true,
    });

    const { loading, data: game } = useAppSyncQuery(GET_GAME_BY_ID_GQL, { id: gameId });

    const quesStateChange = useAppSyncSubs(SUB_QUESTION_STATE_CHANGE_GQL);

    console.debug('quesStateChange', quesStateChange)

    if (quesStateChange) {
        // Why do we only get quesId back ?!?!
        const { quesId } = quesStateChange;

        // Go and get the current question until we figure out why we can't get
        // back what we want.
        appSyncClient.getQuestionByQuesId(quesId, (ques) => {
          setState({
            question: ques,
            mode: "question",
            buzzDisabled: ques.state !== 'open'
          });
        });
    }

    if (loading) {

      return <Loading />;

    } else if (state.mode === "waiting") {

        return (
          <div>
            <PlayerCurrentGame title={game ? game.title : ``}/>
            <Leaderboard contestants={people}
            />
          </div>
        );

    } else if (state.mode === "question") {

          return (
            <div>
              <ContestantQuestion question={state.question} buzzDisabled={state.buzzDisabled} />
            </div>
          );

    }

}

export default PlayGame;
