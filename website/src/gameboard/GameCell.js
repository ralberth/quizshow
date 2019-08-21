import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    active: {
        padding: 18,
        borderRadius: 10,
        backgroundColor: 'lightblue'
    },
    closed: {
        padding: 18,
        borderRadius: 10,
        backgroundColor: '#fafafa'
    }
}));

const GameCell = ({ prize, state }) => {
    const classes = useStyles();
    return (
        <Paper
            className={ state === "closed" ? classes.closed : classes.active }
            elevation={ state === "closed" ? 0 : 5 }
        >
            <Typography align="center" variant="h5">
                ${prize}
            </Typography>
        </Paper>
    );
};

export default GameCell;
