import React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import GameBoard from "../gameboard/GameBoard";
import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import PickGameDialog from "../common/PickGameDialog";

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});

const ALL_GAMES_GQL = gql(`
    query Query {
        listGames {
            gameId
            emcee
            title
        }
    }
`);

const GET_GAME_GQL = gql(`
    query Query($id: Int!) {
        getGameById(gameId: $id) {
            title
            categories {
                catgId
                categoryName
            }
            questions {
                quesId
                catgId
                prize
                question
                answer
            }
        }
    }
`);

class HostGame extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    state = {
        mode: 'loading', // or 'dialog' or 'game'
        gamelist: [],   // bound from calling ALL_GAMES_GQL for the dialog
        gameId: null,
        game: null
    };

    componentDidMount = () => {
        console.log("Firing gql query");
        let me = this;
        API.graphql(graphqlOperation(ALL_GAMES_GQL))
            .then(games => me.setState({ mode: 'dialog', gamelist: games.data.listGames }))
            .catch(err => console.log(`catch:`, err));
    }

    setupGame = (event) => {
        this.setState({ mode: 'loading'});
        const gameId = event.target.defaultValue;
        let me = this;
        API.graphql(graphqlOperation(GET_GAME_GQL, { id: gameId }))
            .then(game => me.setState({ mode: 'game', game: game.data.getGameById }))
            .catch(err => console.log(`catch:`, err));
    }

    render() {
        // - componentDidMount fires amplify query
        // - completed query sets state and opens dialog
        // - dialog on___ sets local state
        // - when dialog completes, call gql to get the game
        // - when gql returns, draw gamebaord
        // - compose a PickGameDialog
        if (this.state.mode === 'loading') {
            return (<span>Loading...</span>);
        } else if (this.state.mode === "dialog") {
            return (
                <PickGameDialog
                    open={true}
                    games={this.state.gamelist}
                    onChoose={this.setupGame}
                    onClose={this.setupGame}
                />
            );
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
                </div>
            );
        }
    }
}

export default HostGame;
