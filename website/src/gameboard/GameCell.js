import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const activeStyle = {
    padding: 24,
    borderRadius: 10,
    backgroundColor: 'orange'
};

const closedStyle = {
    padding: 24,
    borderRadius: 10,
    backgroundColor: 'gray'
};

const GameCell = (props) => (
    <Paper style={{ borderRadius: 6 }}>
        <Typography
            align="center"
            variant="h5"
            color={ props.closed ? "disabled" : "primary" }
            style={ props.closed ? closedStyle : activeStyle }
        >
            ${props.prize}
        </Typography>
    </Paper>
);

export default GameCell;
