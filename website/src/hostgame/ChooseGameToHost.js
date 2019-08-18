import React from 'react';
import { Redirect } from 'react-router';
import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import PickGameDialog from "../common/PickGameDialog";

const ALL_GAMES_GQL = gql(`
    query Query {
        listGames {
            gameId
            emcee
            title
        }
    }
`);

class ChooseGameToHost extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    state = {
        dialogVisible: false,
        gamelist: [],
        reirectToGame: null
    };

    componentDidMount = () => {
        let me = this;
        API.graphql(graphqlOperation(ALL_GAMES_GQL))
            .then(games => me.setState({ dialogVisible: true, gamelist: games.data.listGames }))
            .catch(err => console.log(`catch:`, err));
    }

    setupGame = (gameId) => this.setState({ redirectToGame: gameId });

    render() {
        if (this.state.redirectToGame) {
            return (<Redirect to={`/hostgame/${this.state.redirectToGame}`} />);
        } else {
            return (
                <PickGameDialog
                    isOpen={this.state.dialogVisible}
                    games={this.state.gamelist}
                    onGameChosen={this.setupGame}
                    cancelUri="/"
                />
            );
        }
    }
}

export default ChooseGameToHost;
