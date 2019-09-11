import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Prompter from './Prompter';
import { makeStyles } from '@material-ui/core/styles';
import CancelAbortNextPanel from './CancelAbortNextPanel';
// import Leaderboard from '../common/Leaderboard';

const useStyles = makeStyles(() => {
  return {
    answer: {
      fontWeight: `bold`,
      margin: `2rem`,
      textAlign: `center`,
    },
    topGrid: {
      position: `fixed`,
      height: `33%`,
      width: `100%`,
      maxWidth: `1280px`,
    },
    middleGrid: {
      position: `fixed`,
      height: `55%`,
      width: `100%`,
      maxWidth: `1280px`,
      bottom: 0,
    },
    // bottomGrid: {
    //   position: `fixed`,
    //   height: `33%`,
    //   width: `100%`,
    //   maxWidth: `1280px`,
    //   bottom: `0`,
    // },
    answerGrid: {
      maxWidth: `320px`,
    }
  };
});

const AnswerDisplay = ({ text, people, onCancel, onAbort }) => {
    const classes = useStyles();

    return (
      <Box height="calc(100% - 64px)" >
        <Grid container direction="column" >

          <Grid container className={classes.topGrid} justify="center" alignItems="center" >
            <Grid item className={classes.answerGrid}>

              <Typography className={classes.answer} variant="h5" >
                { `A: ${text}` }
              </Typography>

            </Grid>
          </Grid>

          <Grid className={classes.middleGrid} >
            <Grid container direction="column" justify="center" alignItems="center" >

              <CancelAbortNextPanel
                  onCancel={onCancel}
                  onAbort={onAbort} />

            </Grid>
          </Grid>

          {/* <Grid className={classes.bottomGrid} >
            <Grid container justify="center" alignItems="center" >

              <Leaderboard contestants={people} />

            </Grid>
          </Grid> */}

        </Grid>
      </Box>
    );
}

export default AnswerDisplay;
