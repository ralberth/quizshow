import React from 'react';
import MessageBus from "../common/MessageBus";
import HeroText from "../common/HeroText";
import QuestionControlPanel from './QuestionControlPanel';
import QuestionDisplay from './QuestionDisplay';
import AnswerDisplay from './AnswerDisplay';
import QuestionUtils from '../util/QuestionUtils';
import appSyncClient from '../util/AppSyncClient';

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
        appSyncClient.getGameById(gameId, game => {
            this.setState({ mode: 'choose', game: game });
            this.quesXref = QuestionUtils.buildQuesXref(game);
        });
    }

    transition = (question, newQuesState, newMode, newQuesForState) => {
        appSyncClient.updateQuestionState(question, newQuesState, () => {
            // Now that AppSync is up to date, set my local stuff and redraw
            question.state = newQuesState;
            this.setState({ mode: newMode, question: newQuesForState });
        });
    }

    showQues   = (q) => this.transition(q,                   'display', 'question', q);
    cancelQues = ()  => this.transition(this.state.question, 'ready',   'choose',   null);
    abortQues  = ()  => this.transition(this.state.question, 'closed',  'choose',   null);
    openQues   = ()  => this.transition(this.state.question, 'open',    'answer',   this.state.question);
    cancelAns  = ()  => this.transition(this.state.question, 'ready',   'choose',   null);

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
