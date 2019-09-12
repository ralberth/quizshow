import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Leaderboard from '../common/Leaderboard';
import Loading from '../common/Loading';
import PlayerCurrentGame from './PlayerCurrentGame';
import ContestantQuestion from './ContestantQuestion';
import { useAppSyncQuery, useAppSyncSubs } from "../graphql/useAppSyncHooks";
import { GET_GAME_BY_ID_GQL, SUB_QUES_UPDATES_GQL } from "../graphql/graphqlQueries";
// import useQuestionUpdate from './useQuestionUpdate';
import appSyncClient from '../graphql/AppSyncClient';
import ContestantRenderMode from './ContestantRenderMode';

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

const getContestantRenderMode = quesState => {
  switch (quesState) {
    case 'open':
      return ContestantRenderMode.buzzerEnabled;
    case 'ready':
      return ContestantRenderMode.waiting;
    case 'display':
      return ContestantRenderMode.buzzerDisabled;
    case 'closed':
      return ContestantRenderMode.waiting;
    default:
      throw new Error('Unknown Question State:', quesState);
  }
}

const isNewQuestionId = (state, quesId) => {
  return state.question && state.question.quesId && quesId !== state.question.quesId;
}

const isStateQuestionNull = (state, quesId) => {
  return quesId && !state.question;
}

const isSameQuestionId = (state, quesId) => {
  return quesId === state.question.quesId;
}

const isNewRenderMode = (state, quesState) => {
  return getContestantRenderMode(quesState) !== state.mode;
}

const PlayGame = ({ match: { params: { gameId } }}) => {
    const [state, setState] = useState({
        question: null,
        mode: ContestantRenderMode.waiting,
    });
    const { loading, data: game } = useAppSyncQuery(GET_GAME_BY_ID_GQL, { id: gameId });
    const { quesId=null, state: quesState=null } = useAppSyncSubs(SUB_QUES_UPDATES_GQL);

    if (isStateQuestionNull(state, quesId) || isNewQuestionId(state, quesId)) {
      appSyncClient.getQuestionByQuesId(quesId, (ques) => {
        setState({
          question: ques,
          mode: getContestantRenderMode(ques.state)
        });
      })
    } else if (quesState && isSameQuestionId(state, quesId) && isNewRenderMode(state, quesState)) {
        setState({
          ...state,
          mode: getContestantRenderMode(quesState)
        });
    }

    if (loading) {

      return <Loading />;

    } else if (state.mode === ContestantRenderMode.waiting) {

        return (
          <Grid container direction="column" justify="center" alignItems="center" >
            <PlayerCurrentGame title={game ? game.title : ``}/>
            <Leaderboard contestants={people}
            />
          </Grid>
        );

    } else if (state.mode !== ContestantRenderMode.waiting) {

          return (
            <Grid container >
              <ContestantQuestion {...state} />
            </Grid>
          );

    }

}

export default PlayGame;
