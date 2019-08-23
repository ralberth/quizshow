import React from 'react';
import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";
import HeroText from "../common/HeroText";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import QuestionControlPanel from './QuestionControlPanel';
import NominationControl from './NominationControl';
import Box from '@material-ui/core/Box';

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
                    prize
                    question
                    answer
                    state
                }
            }
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
        currentQuestion: null,
        currentAnswer: null,
        currentCategory: null,
        currentPrize: null
    }

    componentDidMount = () => {
        const { gameId } = this.props.match.params;
        let me = this;
        API.graphql(graphqlOperation(GET_GAME_GQL, { id: gameId }))
            .then(game => me.setState({ game: game.data.getGameById }))
            .catch(err => me.bus.flashMessage(err));
    }

    launchQuestion = (ques) => {
        this.setState({
            currentQuestion: ques.question,
            currentAnswer: ques.answer,
            currentPrize: ques.prize
        });
    }

    render() {
        if (!this.state.game) {
            return (<span>Loading...</span>);
        } else {
            return (
                <div>
                    <HeroText title={this.state.game.title} />

                    <QuestionControlPanel
                        game={this.state.game}
                        onClick={this.launchQuestion} />

                    <Box
                        component="div"
                        visibility={!!this.state.currentQuestion ? "visible" : "hidden"}
                    >
                        <Typography variant="h3">
                            {this.state.currentCategory} for ${this.state.currentPrize}
                        </Typography>

                        <Table style={{ tableLayout: "fixed" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Question</TableCell>
                                    <TableCell>Answer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{this.state.currentQuestion}</TableCell>
                                    <TableCell>{this.state.currentAnswer}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <NominationControl />
                    </Box>
                </div>
            );
        }
    }
}

export default EmceeGame;
