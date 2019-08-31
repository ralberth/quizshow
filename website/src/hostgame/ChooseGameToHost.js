import React from 'react';
import { Redirect } from 'react-router';
import PickGameDialog from "../common/PickGameDialog";
import appSyncClient from "../util/AppSyncClient";

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

    componentDidMount = () => appSyncClient.allGames(
        (gameList) => this.setState({ dialogVisible: true, gamelist: gameList }));

    setupGame = (gameId) => this.setState({ redirectToGame: gameId });

    render() {
        if (this.state.redirectToGame) {
            return (<Redirect to={`/host/${this.state.redirectToGame}`} />);
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
