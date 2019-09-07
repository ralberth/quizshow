import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import HeroText from "../common/HeroText";
import QuestionControlPanel from './QuestionControlPanel';
import QuestionDisplay from './QuestionDisplay';
import AnswerDisplay from './AnswerDisplay';
import appSyncClient from '../graphql/AppSyncClient';
import Loading from '../common/Loading';
import { Enum } from 'enumify';
import { useAppSyncQuery } from "../graphql/useAppSyncHooks";
import { GET_GAME_BY_ID_GQL } from "../graphql/graphqlQueries";

class ScreenMode extends Enum {};
ScreenMode.initEnum([ "choose", "question", "answer" ]);

const EmceeGame = (props) => {
    const [ vars, setVars ] = useState({
        screenMode: ScreenMode.choose,
        question: null
    });

    const { loading, data: game } = useAppSyncQuery(GET_GAME_BY_ID_GQL, { id: props.match.params.gameId });

    const transition = (question, newQuesState, newMode, newQuesForState) => {
        appSyncClient.updateQuestionState(question, newQuesState, () => {
            // Now that AppSync is up to date, set my local stuff and redraw
            question.state = newQuesState;
            setVars({ screenMode: newMode, question: newQuesForState });
        });
    }

    const showQues   = (q) => transition(q,             'display', ScreenMode.question, q);
    const cancelQues = ()  => transition(vars.question, 'ready',   ScreenMode.choose,   null);
    const abortQues  = ()  => transition(vars.question, 'closed',  ScreenMode.choose,   null);
    const openQues   = ()  => transition(vars.question, 'open',    ScreenMode.answer,   vars.question);
    const cancelAns  = ()  => transition(vars.question, 'ready',   ScreenMode.choose,   null);

    if (loading)
        return <Loading />;

    switch(vars.screenMode) {
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
                text={vars.question ? vars.question.question : "?"}
                onCancel={cancelQues}
                onAbort={abortQues}
                onNext={openQues} />
        );
    case ScreenMode.answer:
        return (
            <AnswerDisplay
                text={vars.question ? vars.question.answer : "?"}
                onCancel={cancelAns}
                onAbort={abortQues} />
        );
    default:
        return (<div>Something went wrong, bad value for Mode</div>);
    }
}

export default EmceeGame;
