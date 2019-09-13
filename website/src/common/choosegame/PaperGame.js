import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  gameName: {
    color: grey[800],
    fontWeight: `900`,
    textAlign: `center`,
    textDecoration: `none`,
  },
  paperLink: {
    width: '100%',
    maxWidth: 400,
    margin: theme.spacing(1),
    cursor: `pointer`,
    textTransform: `uppercase`,
    textDecoration: `none`,
    "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: `none`,
    },
  }
}));

const PaperGame = ({ gameId, uriPrefix, title }) => {
  const classes = useStyles();
  const path = `${uriPrefix}/${gameId}`;

  return (
    <Paper component={Link} to={path} className={classes.paperLink} >
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1" className={classes.gameName}>
            { title }
          </Typography>
        </Grid>
        <Grid item>
          <Fab size="small" color="primary" aria-label="add" className={classes.fab}>
            <PlayArrowIcon />
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PaperGame;
