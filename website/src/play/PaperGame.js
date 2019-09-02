import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    maxWidth: 360,
    margin: `1rem 0`,
  },
  fab: {
    margin: theme.spacing(2),
  },
  gameName: {
    color: grey[800],
    fontWeight: `bold`,
    textAlign: `center`,
  },
}));

const PaperGame = ({ gameId, title, playCallback }) => {
  const classes = useStyles();

  const playClicked = () => {
    if (!!gameId) {
      playCallback(gameId);
    }
  }

  return (
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs>
            <Typography variant="h6" className={classes.gameName}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Fab size="small" color="primary" aria-label="add" className={classes.fab}>
              <PlayArrowIcon onClick={playClicked} />
            </Fab>
          </Grid>
        </Grid>
      </Paper>
  );
}

export default PaperGame;
