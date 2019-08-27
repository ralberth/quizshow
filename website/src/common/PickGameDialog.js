import QuizDialog from "./QuizDialog";
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
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
                    {/* <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Quiz Title</TableCell>
                                <TableCell>Emcee</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games.map(row => (
                                <TableRow key={row.gameId}>
                                    <TableCell>
                                        <Radio
                                            value={row.gameId}
                                            checked={`${this.state.gameId}` === `${row.gameId}`}
                                            onChange={this.handleChoose}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {row.title}
                                    </TableCell>
                                    <TableCell>{row.emcee}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> */}
                </QuizDialog>
            );
        }
    }
}

export default PickGameDialog;
