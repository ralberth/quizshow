import QuizDialog from "./QuizDialog";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const PickGameDialog = (props) => {
    const { open, games, onChoose, onClose } = props;


    return (
        <QuizDialog
            open={open}
            title="Host a Quiz Game"
            buttonLabel="Host Game"
            onClick={onClose}
        >
            <RadioGroup>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Quiz Title</TableCell>
                            <TableCell>Emcee</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map(row => (
                            <TableRow key={row.gameId}>
                                <TableCell>
                                    <FormControlLabel
                                        value={row.gameId}
                                        control={<Radio />}
                                        label={row.title}
                                        onChange={onChoose}
                                    />
                                </TableCell>
                                <TableCell>{row.emcee}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </RadioGroup>
        </QuizDialog>
    );
};

export default PickGameDialog;
