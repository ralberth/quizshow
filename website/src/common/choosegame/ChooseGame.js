import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSyncQuery } from "../../graphql/useAppSyncHooks";
import Loading from '../Loading';
import PaperGame from "./PaperGame";
import { ALL_GAMES_GQL } from "../../graphql/graphqlQueries";

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: `bold`,
    margin: `2rem 0`,
    textAlign: `center`,
  },
}));

const ChooseGame = ({ uriPrefix }) => {
  const classes = useStyles();
  const { loading, data } = useAppSyncQuery(ALL_GAMES_GQL);

  if (loading)
    return <Loading />;

  return (
    <div className={classes.root} >
      <Typography className={classes.title} variant="h5">Choose A Game</Typography>
      <Grid container justify="center" alignItems="center">
        { data.map(({gameId, title}) => <PaperGame key={gameId} {...{gameId, uriPrefix, title}}/>) }
      </Grid>
    </div>
  );

}

export default ChooseGame;
