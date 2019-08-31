import React from 'react';
import { Redirect } from 'react-router';
import appSyncClient from '../util/AppSyncClient';
import PickGameDialog from "../common/PickGameDialog";

class ChooseGameToEmcee extends React.Component {

    state = {
        dialogVisible: false,
        gamelist: [],
        reirectToGame: null
    };

    componentDidMount = () => appSyncClient.allGames(
        (games) => this.setState({ dialogVisible: true, gamelist: games }));

    setupGame = (gameId) => this.setState({ redirectToGame: gameId });

    render() {
        if (this.state.redirectToGame) {
            return (<Redirect to={`/emcee/${this.state.redirectToGame}`} />);
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

export default ChooseGameToEmcee;
