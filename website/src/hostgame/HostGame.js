import API, { graphqlOperation } from "@aws-amplify/api";
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import gql from "graphql-tag";
import React from 'react';
import MessageBus from "../common/MessageBus";
import Faceoff from "../faceoff/Faceoff";
import GameBoard from "./GameBoard";
import QuestionUtils from "../util/QuestionUtils";
import AppSyncClient from '../util/AppSyncClient';

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});

const SUB_QUES_UPDATES_GQL = gql(`
    subscription Subscription {
        questionStateChange {
            quesId
            question
            state
        }
    }
`);

const GET_QUES_GQL = gql(`
    query Query($quesId: Int!) {
        getQuestionByQuesId(quesId: $quesId) {
            state
        }
    }
`);

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
        this.subscription = API.graphql(graphqlOperation(SUB_QUES_UPDATES_GQL))
            .subscribe({
                next: (notification) => {
                    // Why do we only get quesId back ?!?!
                    const quesId = notification.value.data.questionStateChange.quesId;

                    // Go and get the current question until we figure out why we can't get
                    // back what we want.
                    API.graphql(graphqlOperation(GET_QUES_GQL, { quesId: quesId }))
                        .then(response => {
                            const newState = response.data.getQuestionByQuesId.state;
                            const question = this.quesXref[quesId];
                            if (question) {
                                question.state = newState; // so grid makes closed things go away
                                this.setState({ question: question });
                            } else {
                                console.log(`Ignoring quesId ${quesId}: not found on this game.`);
                            }
                        })
                        .catch(err => this.bus.flashMessage(err));
                },
                error: err => this.bus.flashMessage(err)
            });
    }

    componentDidMount = () => {
        AppSyncClient.getGameById(this.gameId, game => {
            this.quesXref = QuestionUtils.buildQuesXref(game);
            this.setState({ game: game });
            this.setupSubscription();
        });
    }

    componentWillUnmount = () => this.subscription.unsubscribe();

    render() {
        if (!this.state.game) {
            return (<span>Loading...</span>);
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
