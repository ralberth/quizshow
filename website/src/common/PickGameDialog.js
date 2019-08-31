import QuizDialog from "./QuizDialog";
import React from 'react';
import Radio from '@material-ui/core/Radio';
import { Redirect } from 'react-router';
import Box from '@material-ui/core/Box';

class PickGameDialog extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    state = {
        gameId: "",
        cancelPressed: false
    };

    handleChoose = (event) => this.setState({ gameId: event.target.value });

    gameChosen = () => {
        if (!!this.state.gameId)
            this.props.onGameChosen(this.state.gameId);
    }

    handleCancel = () => this.setState({ cancelPressed: true });


    render() {
        if (this.state.cancelPressed) {
            return (<Redirect to={this.props.cancelUri} />);
        } else {
            const { games, isOpen } = this.props;
            return (
                <QuizDialog
                    isOpen={isOpen}
                    title="Choose a Quiz Game"
                    onCancel={this.handleCancel}
                    onAccept={this.gameChosen}
                >
                    {games.map(row => (
                        <Box key={row.gameId}>
                            <Radio
                                value={row.gameId}
                                checked={`${this.state.gameId}` === `${row.gameId}`}
                                onChange={this.handleChoose}
                                color="primary"
                            />
                            {row.title}
                        </Box>
                    ))}
                </QuizDialog>
            );
        }
    }
}

export default PickGameDialog;
