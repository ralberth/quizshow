import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import React from 'react';
import Faceoff from "../faceoff/Faceoff";
import GameBoard from "./GameBoard";
import QuestionUtils from "../util/QuestionUtils";
import appSyncClient from '../graphql/AppSyncClient';
import Loading from "../common/Loading";
import { useAppSyncQuery, useAppSyncSubs } from "../graphql/useAppSyncHooks";

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});

class HostGame extends React.Component {

    constructor(props) {
        super(props);
        this.gameId = props.match.params.gameId;
    }

    state = {
        game: null,
        question: null,
        nominees: []
    }

    handleQuestionStateChange = (ques) => {
        console.debug("Got ques back on sub:", ques);
        const question = this.quesXref.get(ques.quesId);
        if (question) {
            question.state = ques.state; // so grid makes closed things go away
            if (question.state === "display")
                this.setState({ question: question, nominees: [] });
            if (question.state === "closed" || question.state === "ready")
                this.setState({ question: null });
        }
    }

    handleNominee = (nominee) => {
        console.debug("Nominated: ", nominee);
        this.state.nominees.push(nominee);
        this.state.nominees.sort((a,b) => a.timebuzzed - b.timebuzzed);
        this.forceUpdate();
    }

    populateGameBoard = (game) => {
        this.quesXref = QuestionUtils.buildQuesXref(game);
        this.setState({ game: game });
    }

    componentDidMount = () => {
        appSyncClient.getGameById(this.gameId, this.populateGameBoard);
        this.quesSub = appSyncClient.subQuestionStateChange(this.handleQuestionStateChange);
        this.nomSub  = appSyncClient.subNominateContestant(this.handleNominee);
    }

    componentWillUnmount = () => {
        if (this.questionSubscription)
            this.questionSubscription.unsubscribe();
        if (this.nomineeSubscription)
            this.nomineeSubscription.unsubscribe();
    }

    render() {
        if (!this.state.game) {
            return <Loading />
        } else {
            return (
                <div>
                    <GameTitle
                        variant="h3"
                        align="center"
                    >
                        {this.state.game.title}
                    </GameTitle>
                    <GameBoard game={this.state.game} />
                    <Faceoff
                        question={this.state.question}
                        nominees={this.state.nominees}
                    />
                </div>
            );
        }
    }
}

export default HostGame;
