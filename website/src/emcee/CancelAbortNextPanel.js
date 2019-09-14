import React from 'react';
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
          <Grid item md={4} sm={12} xs={12} >
            <Grid container justify="center" alignItems="center" >
              <Grid item md={4} sm={8} xs={8} className={classes.gridItem} >
                <Grid container justify="center" alignItems="center" visibility={onCancel ? "visible" : "hidden"}>
                    <CancelButton onCancel={onCancel} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={12} xs={12} >
            <Grid container justify="center" alignItems="center" >
              <Grid item md={4} sm={8} xs={8} className={classes.gridItem} >
                <Grid container justify="center" alignItems="center" visibility={onCancel ? "visible" : "hidden"}>
                    <AbortButton onAbort={onAbort} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={12} xs={12} >
            <Grid container justify="center" alignItems="center" >
              <Grid item md={4} sm={8} xs={8} className={classes.gridItem} >
                <Grid container justify="center" alignItems="center" visibility={onCancel ? "visible" : "hidden"}>
                    <NextButton onNext={onNext} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
  );
}

export default CancelAbortNextPanel;
