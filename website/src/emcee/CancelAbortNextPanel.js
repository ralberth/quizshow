import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CancelButton, AbortButton, NextButton } from '../common/StandardButtons';

const useStyles = makeStyles(() => {
  return {
    gridItem: {
      margin: `8px 0`,
    },
  };
});

const CancelAbortNextPanel = ({ onCancel, onAbort, onNext }) => {
  const classes = useStyles();

  return (
      <Grid container justify="space-around" alignItems="center">
          <Grid item sm={4} xs={12} className={classes.gridItem} >
              <Box visibility={onCancel ? "visible" : "hidden"}>
                  <CancelButton onCancel={onCancel} />
              </Box>
          </Grid>
          <Grid item sm={4} xs={12} className={classes.gridItem} >
              <Box visibility={onAbort ? "visible" : "hidden"}>
                  <AbortButton onAbort={onAbort} />
              </Box>
          </Grid>
          <Grid item sm={4} xs={12} className={classes.gridItem} >
              <Box visibility={onNext ? "visible" : "hidden"}>
                  <NextButton onNext={onNext} />
              </Box>
          </Grid>
      </Grid>
  );
}

export default CancelAbortNextPanel;
