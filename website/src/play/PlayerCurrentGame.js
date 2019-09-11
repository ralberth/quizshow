import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => {
  return {
    subtitle: {
      color: grey[700],
      fontWeight: `bold`,
      margin: `2rem 0 0 0`,
      textAlign: `center`,
    },
    title: {
      color: theme.palette.primary.main,
      fontWeight: `bold`,
      margin: `0 0 2rem 0`,
      textAlign: `center`,
    }
  };
});

const PlayerCurrentGame = ({ title }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography className={classes.subtitle} variant="h6">
        Current Game
      </Typography>
      <Typography className={classes.title} variant="h5">
        { _.upperCase(title) }
      </Typography>
    </Grid>
  );
}

export default PlayerCurrentGame;
