import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const MAR =  8;
const PAD = 18;

const useStyles = makeStyles(theme => ({
    rank0:  { margin: MAR, padding: PAD, backgroundColor: '#5680E9' },
    rank1:  { margin: MAR, padding: PAD, backgroundColor: '#84CEEB' },
    rank2:  { margin: MAR, padding: PAD, backgroundColor: '#5AB9EA' },
    rank3:  { margin: MAR, padding: PAD, backgroundColor: '#C1C8E4' },
    rank4:  { margin: MAR, padding: PAD, backgroundColor: '#8860D0' },
    rank5:  { margin: MAR, padding: PAD, backgroundColor: '#88BDBC' },
    rank6:  { margin: MAR, padding: PAD, backgroundColor: '#5680E9' },
    closed: { margin: MAR, padding: PAD, backgroundColor: '#fafafa' }
}));

const GameCell = ({ points, rank, state }) => {
    const classes = useStyles();
    var className = (state === "closed") ? classes.closed : classes[`rank${rank}`];

    return (
        <Paper
            className={className}
            elevation={0}
            square={true}
        >
            <Typography align="center" variant="h5">
                {state === "closed" ? "" : points}
            </Typography>
        </Paper>
    );
};

export default GameCell;
