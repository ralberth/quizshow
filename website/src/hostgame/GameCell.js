import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const MAR =  8;
const PAD = 18;
const HGT = `7rem`;


const useStyles = makeStyles(theme => {
  const isDark = theme.palette.type === 'dark';
  const color = isDark ? theme.palette.text.primary : grey[900];
  return {
    base: {
      margin: MAR,
      padding: PAD,
      height: HGT,
      color: color,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    rankCatg: {
      color: isDark ? theme.palette.text.primary : grey[700],
      height: `9rem`,
    },
    rank0:  { backgroundColor: '#5680E9' },
    rank1:  { backgroundColor: '#84CEEB' },
    rank2:  { backgroundColor: '#5AB9EA' },
    rank3:  { backgroundColor: '#C1C8E4' },
    rank4:  { backgroundColor: '#8860D0' },
    rank5:  { backgroundColor: '#88BDBC' },
    rank6:  { backgroundColor: '#5680E9' },
    closed: { backgroundColor: '#fafafa' },
    typography: {
      fontWeight: 550,
    }
  }
});

const GameCell = ({ points, rank, state }) => {
    const classes = useStyles();
    const color = (state === "closed") ? classes.closed : classes[`rank${rank}`];
    const elevation = state === 'closed' ? 0 : 6;

    return (
        <Paper
            className={`${classes.base} ${color}`}
            elevation={elevation}
            square={true}
        >
            <Typography align="center" variant="h5" className={classes.typography} >
                {state === "closed" ? "" : points}
            </Typography>
        </Paper>
    );
};

export default GameCell;
