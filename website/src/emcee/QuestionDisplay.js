import React from 'react';
// import Prompter from './Prompter';
import CancelAbortNextPanel from './CancelAbortNextPanel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => {
  return {
    question: {
      fontWeight: `bold`,
      margin: `2rem`,
      textAlign: `center`,
    },
    topGrid: {
      position: `fixed`,
      height: `35%`,
      width: `100%`,
      maxWidth: `1280px`,
    },
    bottomGrid: {
      position: `fixed`,
      height: `55%`,
      width: `100%`,
      maxWidth: `1280px`,
      bottom: 0,
    },
    questionGrid: {
      maxWidth: `320px`,
    }
  };
});

const QuestionDisplay = ({ text, onCancel, onAbort, onNext }) => {
  const classes = useStyles();

  return (
      <Box height="calc(100% - 64px)" >
        <Grid container direction="column" >

          <Grid container className={classes.topGrid} justify="center" alignItems="center" >
            <Grid item className={classes.questionGrid}>

              <Typography className={classes.question} variant="h5" >
                { `Q: ${text}` }
              </Typography>

            </Grid>
          </Grid>

          <Grid className={classes.bottomGrid} >
            <Grid container justify="center" alignItems="center" >

              <CancelAbortNextPanel
                  onCancel={onCancel}
                  onAbort={onAbort}
                  onNext={onNext} />

            </Grid>
          </Grid>

        </Grid>
      </Box>
  )
}

export default QuestionDisplay;
