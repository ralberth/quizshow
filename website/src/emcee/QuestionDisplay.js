import React from 'react';
import CancelAbortNextPanel from './CancelAbortNextPanel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => {
  return {
    question: {
      fontWeight: `bold`,
      margin: `6rem`,
      textAlign: `center`,
    }
  };
});

const QuestionDisplay = ({ text, onCancel, onAbort, onNext }) => {
  const classes = useStyles();

  return (
      <Grid container direction="column" justify="flex-start" alignItems="center">

        <Grid item >
          <Typography className={classes.question} variant="h5" >
            { `Q: ${text}` }
          </Typography>
        </Grid>

        <Grid item >
            <CancelAbortNextPanel
                onCancel={onCancel}
                onAbort={onAbort}
                onNext={onNext} />
        </Grid>

      </Grid>
  );
}

export default QuestionDisplay;
