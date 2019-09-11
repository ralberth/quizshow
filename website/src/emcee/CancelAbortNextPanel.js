import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CancelButton, AbortButton, NextButton } from '../common/StandardButtons';

const useStyles = makeStyles(() => {
  return {
    girdItem: {
      margin: `10px 0`,
    },
  };
});

const CancelAbortNextPanel = ({ onCancel, onAbort, onNext }) => {
  const classes = useStyles();

  return (
      <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
      >
          <Grid item className={classes.girdItem} >
              <Box visibility={onCancel ? "visible" : "hidden"}>
                  <CancelButton onCancel={onCancel} />
              </Box>
          </Grid>
          <Grid item className={classes.girdItem} >
              <Box visibility={onAbort ? "visible" : "hidden"}>
                  <AbortButton onAbort={onAbort} />
              </Box>
          </Grid>
          <Grid item className={classes.girdItem} >
              <Box visibility={onNext ? "visible" : "hidden"}>
                  <NextButton onNext={onNext} />
              </Box>
          </Grid>
      </Grid>
  );
}

export default CancelAbortNextPanel;
