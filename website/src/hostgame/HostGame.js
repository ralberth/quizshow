import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import React from 'react';
import MessageBus from "../common/MessageBus";
import Faceoff from "../faceoff/Faceoff";
import GameBoard from "./GameBoard";
import QuestionUtils from "../util/QuestionUtils";
import appSyncClient from '../util/AppSyncClient';
import Loading from "../common/Loading";

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});


class HostGame extends React.Component {

    constructor(props) {
        super(props);
        this.gameId = props.match.params.gameId;
        this.subscription = null;
        this.bus = new MessageBus();
    }

    state = {
        game: null,
        question: null
    }

    setupSubscription = () => {
        this.subscription = appSyncClient.subQuestionStateChange(
            (stateChange) => {
                // Why do we only get quesId back ?!?!
                const quesId = stateChange.quesId;

                // Go and get the current question until we figure out why we can't get
                // back what we want.
                appSyncClient.getQuestionByQuesId(quesId, (ques) => {
                    const question = this.quesXref.get(quesId);
                    if (question) {
                        question.state = ques.state; // so grid makes closed things go away
                        this.setState({ question: question });
                    } else {
                        console.log(`Ignoring quesId ${quesId}: not found on this game.`);
                    }
                });
            }
        );
    }

    componentDidMount = () => {
        appSyncClient.getGameById(this.gameId, game => {
            this.quesXref = QuestionUtils.buildQuesXref(game);
            this.setState({ game: game });
            this.setupSubscription();
        });
    }

    componentWillUnmount = () => this.subscription.unsubscribe();

    render() {
        if (!this.state.game) {
            return <Loading />;
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
                    />
                </div>
            );
        }
    }
}

export default HostGame;
