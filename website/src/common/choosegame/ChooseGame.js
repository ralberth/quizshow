import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAppSyncQuery } from "../../graphql/useAppSyncHooks";
import Loading from '../Loading';
import PaperGame from "./PaperGame";
import { ALL_GAMES_GQL } from "../../graphql/graphqlQueries";

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: `bold`,
    margin: `2rem 0`,
    textAlign: `center`,
  },
}));

const ChooseGame = ({ uriPrefix }) => {
  const classes = useStyles();
  const [redirectToGame, setRedirectToGame] = useState(null);
  const { loading, data } = useAppSyncQuery(ALL_GAMES_GQL);

  const setupGame = gameId => setRedirectToGame(`${uriPrefix}/${gameId}`);

  if (loading)
    return <Loading />;

  if (redirectToGame)
    return (<Redirect to={redirectToGame} />);

  return (
    <div className={classes.root} >
      <Typography className={classes.title} variant="h5">Choose A Game</Typography>
      <Grid container justify="center" alignItems="center">
        {
          data.map(
            game => <PaperGame key={game.gameId} {...game} playCallback={setupGame}/>
          )
        }
      </Grid>
    </div>
  );
}

export default ChooseGame;
