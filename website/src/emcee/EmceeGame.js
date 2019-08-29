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
    mutation mod($catgId: Int!, $quesId: Int!, $newState: StateEnum!) {
        setQuestionState(catgId: $catgId, quesId: $quesId, state: $newState) {
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

    buildQuesXref = (game) => {
        var ret = {};
        game.categories.forEach(catg =>
            catg.questions.forEach(ques =>
                ret[ques.quesId] = ques));
        return ret;
    }

    componentDidMount = () => {
        const { gameId } = this.props.match.params;
        API.graphql(graphqlOperation(GET_GAME_GQL, { id: gameId }))
            .then(response => {
                const game = response.data.getGameById;
                this.setState({ mode: 'choose', game: game });
                this.quesXref = this.buildQuesXref(game);
            })
            .catch(err => this.bus.flashMessage(err));
    }

    transition = (question, newQuesState, newMode, newQuesForState) => {
        console.log(`Moving "${question.question} to ${newQuesState}.  Screen to ${newMode}`);
        const args = { catgId: question.catgId, quesId: question.quesId, newState: newQuesState };
        API.graphql(graphqlOperation(UPDATE_QUES_STATE_GQL, args))
            .then(ques => {
                // Now that AppSync is up to date, set my local stuff and redraw
                this.quesXref[question.quesId].state = newQuesState; // updates this.state.game tree
                this.setState({ mode: newMode, question: newQuesForState });
            })
            .catch(err => this.bus.flashMessage(err));
    }

    showQues   = (q) => this.transition(q,                   'ready',  'question', q);
    cancelQues = ()  => this.transition(this.state.question, 'ready',  'choose',   null);
    abortQues  = ()  => this.transition(this.state.question, 'closed', 'choose',   null);
    openQues   = ()  => this.transition(this.state.question, 'open',   'answer',   this.state.question);
    cancelAns  = ()  => this.transition(this.state.question, 'ready',  'choose',   null);

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
                        onClick={this.showQues} />
                </div>
            );
        case 'question':
            return (
                <QuestionDisplay
                    text={this.state.question.question}
                    onCancel={this.cancelQues}
                    onAbort={this.abortQues}
                    onNext={this.openQues} />
            );
        case 'answer':
            return (
                <AnswerDisplay
                    text={this.state.question.answer}
                    onCancel={this.cancelAns}
                    onAbort={this.abortQues} />
            );
        default:
            return (<div>Something went wrong, bad value for Mode</div>);
        }
    }
}

export default EmceeGame;
