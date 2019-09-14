import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    largeButton: {
      margin: '10px',
      padding: '8px',
      minWidth: '10rem',
      minHeight: '3rem',
      width: `100%`,
    }
}));

const CorrectWrongPanel = ({ onCorrect, onWrong }) => {
  const classes = useStyles();
  return (
    <Grid
        container
        direction="row"
        spacing={8}
    >
        <Grid item>
            <Button className={classes.largeButton}
                variant="contained"
                color="primary"
                onClick={onCorrect}
            >
                Correct
            </Button>
        </Grid>
        <Grid item>
            <Button className={classes.largeButton}
                variant="contained"
                color="secondary"
                onClick={onWrong}
            >
                Wrong
            </Button>
        </Grid>
    </Grid>
  );
}


export default CorrectWrongPanel;
