import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import React, { useState } from 'react';
import Faceoff from "../faceoff/Faceoff";
import GameBoard from "./GameBoard";
import QuestionUtils from "../util/QuestionUtils";
import appSyncClient from '../graphql/AppSyncClient';
import Loading from "../common/Loading";
import { useAppSyncQuery, useAppSyncSubs } from "../graphql/useAppSyncHooks";
import { GET_GAME_BY_ID_GQL, SUB_QUESTION_STATE_CHANGE_GQL } from "../graphql/graphqlQueries";

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});


const HostGame = (props) => {
    const [ question, setQuestion ] = useState(null);

    const { loading, data: game } = useAppSyncQuery(GET_GAME_BY_ID_GQL, { id: props.match.params.gameId });

    const quesXref = game ? QuestionUtils.buildQuesXref(game) : null;

    const quesStateChange = useAppSyncSubs(SUB_QUESTION_STATE_CHANGE_GQL);

    if (quesStateChange) {
        // Why do we only get quesId back ?!?!
        const { quesId } = quesStateChange;

        // Go and get the current question until we figure out why we can't get
        // back what we want.
        appSyncClient.getQuestionByQuesId(quesId, (ques) => {
            const question = quesXref.get(quesId);
            if (question) {
                question.state = ques.state; // so grid makes closed things go away
                setQuestion(question);
            } else {
                console.log(`Ignoring quesId ${quesId}: not found on this game.`);
            }
        });
    }

    if (loading)
        return <Loading />;

    return (
        <div>
            <GameTitle
                variant="h3"
                align="center"
            >
                {game ? game.title : ""}
            </GameTitle>
            <GameBoard game={game} />
            <Faceoff
                question={question}
            />
        </div>
    );
}

export default HostGame;
