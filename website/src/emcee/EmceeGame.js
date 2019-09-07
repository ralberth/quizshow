import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import HeroText from "../common/HeroText";
import QuestionControlPanel from './QuestionControlPanel';
import QuestionDisplay from './QuestionDisplay';
import AnswerDisplay from './AnswerDisplay';
import appSyncClient from '../util/AppSyncClient';
import Loading from '../common/Loading';
import { Enum } from 'enumify';
import gql from "graphql-tag"
import useAppSyncQuery from "../hooks/useAppSyncQuery";

const GET_GAME_GQL = gql`
    query Query($id: Int!) {
        getGameById(gameId: $id) {
            title
            categories {
                catgId
                categoryName
                questions {
                    quesId
                    catgId
                    points
                    question
                    answer
                    state
                }
            }
        }
    }
`;

class ScreenMode extends Enum {};
ScreenMode.initEnum([ "choose", "question", "answer" ]);

const EmceeGame = (props) => {
    const [ screenMode, setScreenMode ] = useState(ScreenMode.choose);
    const [ question, setQuestion ] = useState(null);

    const { loading, data } = useAppSyncQuery(GET_GAME_GQL, { id: props.match.params.gameId });
    const { getGameById: game } = data;

    const transition = (question, newQuesState, newMode, newQuesForState) => {
        appSyncClient.updateQuestionState(question, newQuesState, () => {
            // Now that AppSync is up to date, set my local stuff and redraw
            question.state = newQuesState;
            setQuestion(newQuesForState);
            setScreenMode(newMode);
        });
    }

    const showQues   = (q) => transition(q,        'display', ScreenMode.question, q);
    const cancelQues = ()  => transition(question, 'ready',   ScreenMode.choose,   null);
    const abortQues  = ()  => transition(question, 'closed',  ScreenMode.choose,   null);
    const openQues   = ()  => transition(question, 'open',    ScreenMode.answer,   question);
    const cancelAns  = ()  => transition(question, 'ready',   ScreenMode.choose,   null);

    if (loading)
        return <Loading />;

    switch(screenMode) {
    case ScreenMode.choose:
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <HeroText title={props.title} />
                <QuestionControlPanel
                    game={game}
                    onClick={showQues} />
            </Grid>
        );
    case ScreenMode.question:
        return (
            <QuestionDisplay
                text={question ? question.question : "?"}
                onCancel={cancelQues}
                onAbort={abortQues}
                onNext={openQues} />
        );
    case ScreenMode.answer:
        return (
            <AnswerDisplay
                text={question ? question.answer : "?"}
                onCancel={cancelAns}
                onAbort={abortQues} />
        );
    default:
        return (<div>Something went wrong, bad value for Mode</div>);
    }
}

export default EmceeGame;
