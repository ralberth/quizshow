import React from 'react';
import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";
import HeroText from "../common/HeroText";
// import Typography from '@material-ui/core/Typography';
import QuestionControlPanel from './QuestionControlPanel';
// import Box from '@material-ui/core/Box';
// import { Button } from '@material-ui/core';
import QuestionDisplay from './QuestionDisplay';
import AnswerDisplay from './AnswerDisplay';

const GET_GAME_GQL = gql(`
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
`);

const UPDATE_QUES_STATE_GQL = gql(`
    mutation mod($quesId: Int!, $newState: StateEnum) {
        setQuestionState(quesId: $quesId, newState: $newState) {
            quesId
        }
    }
`);

class EmceeGame extends React.Component {

    constructor(props) {
        super();
        this.props = props;
        this.bus = new MessageBus();
    }

    state = {
        game: null,
        question: null,
        mode: 'loading'
    }

    componentDidMount = () => {
        const { gameId } = this.props.match.params;
        API.graphql(graphqlOperation(GET_GAME_GQL, { id: gameId }))
            .then(game => {
                this.setState({ mode: 'choose', game: game.data.getGameById });
                console.log("CHOOSE");
            })
            .catch(err => this.bus.flashMessage(err));
    }

    setQuesState = (ques, state) => {
        // const args = { quesId: this.state.question.quesId, newStatus: 'open' };
        // API.graphql(graphqlOperation(UPDATE_QUES_STATE_GQL, args))
        //     .then(ques => {
        //         // TODO: update AppSync
        //         this.setState({ mode: 'answer', question: this.state.question });
        //     })
        //     .catch(err => this.bus.flashMessage(err));
    }

    showQuestion = (ques) => {
        this.setState({ mode: 'question', question: ques });
    }

    cancelQuestion = () => {
        this.setState({ mode: 'choose', question: null });
    }

    abortQuestion = () => {
        this.setQuesState(this.state.question.quesId, 'closed');
        this.setState({ mode: 'choose', question: null });
    }

    openQuestion = () => {
        this.setState({ mode: 'answer', question: this.state.question });
        this.setQuesState(this.state.question.quesId, 'open');
    }

    cancelAnswer = () => {
        this.setQuesState(this.state.question.quesId, 'ready');
        this.setState({ mode: 'choose', question: null });
    }

    render() {
        switch(this.state.mode) {
        case 'loading':
            return (<span>Loading...</span>);
        case 'choose':
            return (
                <div>
                    <HeroText title={this.state.game.title} />
                    <QuestionControlPanel
                        game={this.state.game}
                        onClick={this.showQuestion} />
                </div>
            );
        case 'question':
            return (
                <QuestionDisplay
                    text={this.state.question.question}
                    onCancel={this.cancelQuestion}
                    onAbort={this.abortQuestion}
                    onNext={this.openQuestion} />
            );
        case 'answer':
            return (
                <AnswerDisplay
                    text={this.state.question.answer}
                    onCancel={this.cancelAnswer}
                    onAbort={this.abortQuestion} />
            );
        default:
            return (<div>Something went wrong, bad value for Mode</div>);
        }
    }
}

export default EmceeGame;
