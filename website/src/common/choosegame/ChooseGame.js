import React, { useState } from 'react'
import { Redirect } from 'react-router';
// import _ from 'lodash';
import gql from "graphql-tag"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useAppSyncQuery from "../../hooks/useAppSyncQuery";
import Grid from '@material-ui/core/Grid';
import PaperGame from "./PaperGame";

const ALL_GAMES_GQL = gql`
  query Query {
      listGames {
          gameId
          emcee
          title
      }
  }
`;

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
  const { data } = useAppSyncQuery(ALL_GAMES_GQL);
  const { listGames: gameList=[] } = data;

  const setupGame = gameId => setRedirectToGame(`${uriPrefix}/${gameId}`);

  if (redirectToGame) {
      return (<Redirect to={redirectToGame} />);
  } else {
      return (
        <div className={classes.root} >
          <Typography className={classes.title} variant="h5">Choose A Game</Typography>
          <Grid container justify="center" alignItems="center">
            {
              gameList.map(
                game => <PaperGame key={game.gameId} {...game} playCallback={setupGame}/>
              )
            }
          </Grid>
        </div>
      );
  }
}

export default ChooseGame;
