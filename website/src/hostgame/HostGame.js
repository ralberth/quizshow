import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import React, { useState } from 'react';
import MessageBus from "../common/MessageBus";
import Faceoff from "../faceoff/Faceoff";
import GameBoard from "./GameBoard";
import QuestionUtils from "../util/QuestionUtils";
import appSyncClient from '../graphql/AppSyncClient';
import Loading from "../common/Loading";
import { useAppSyncQuery } from "../graphql/useAppSyncHooks";
import useAppSyncSubscription from "../graphql/useAppSyncSubscription";
import { GET_GAME_BY_ID_GQL, SUB_QUESTION_STATE_CHANGE_GQL } from "../graphql/graphqlQueries";

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});


const HostGame = (props) => {
    const [ question, setQuestion ] = useState(null);

    const { loading, data: game } = useAppSyncQuery(GET_GAME_BY_ID_GQL, { id: props.match.params.gameId });

    // const something = useAppSyncSubscription(SUB_QUESTION_STATE_CHANGE_GQL);
    // console.log("subs", something);

    const quesXref = !!game ? QuestionUtils.buildQuesXref(game) : null;


    // setupSubscription = () => {
    //     this.subscription = appSyncClient.subQuestionStateChange(
    //         (stateChange) => {
    //             // Why do we only get quesId back ?!?!
    //             const quesId = stateChange.quesId;

    //             // Go and get the current question until we figure out why we can't get
    //             // back what we want.
    //             appSyncClient.getQuestionByQuesId(quesId, (ques) => {
    //                 const question = this.quesXref.get(quesId);
    //                 if (question) {
    //                     question.state = ques.state; // so grid makes closed things go away
    //                     this.setState({ question: question });
    //                 } else {
    //                     console.log(`Ignoring quesId ${quesId}: not found on this game.`);
    //                 }
    //             });
    //         }
    //     );
    // }

    // componentDidMount = () => {
    //     appSyncClient.getGameById(this.gameId, game => {
    //         this.quesXref = QuestionUtils.buildQuesXref(game);
    //         this.setState({ game: game });
    //         this.setupSubscription();
    //     });
    // }

    // componentWillUnmount = () => this.subscription.unsubscribe();

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
