import React, { useState } from 'react'
import { Redirect } from 'react-router';
import _ from 'lodash';
import gql from "graphql-tag"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useAppSyncQuery from "../hooks/useAppSyncQuery";
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

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: `bold`,
    margin: `2rem 0`,
    textAlign: `center`,
  },
}));


const ChooseGameToPlay = () => {
  const classes = useStyles();
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [redirectToGame, setRedirectToGame] = useState(null);
  const { data: { listGames: gameList=[] } } = useAppSyncQuery(ALL_GAMES_GQL);

  if (!_.isEmpty(gameList) && !dialogVisibility) {
    setDialogVisibility(true);
  }

  const setupGame = gameId => setRedirectToGame(gameId);

  if (redirectToGame) {
      return (<Redirect to={`/play/${redirectToGame}`} />);
  } else {
      return (
        <div className={classes.root} >
          <Typography className={classes.title} variant="h5">Choose A Game</Typography>
          <div>
            { gameList.map((game, i) => <PaperGame key={i} {...game} playCallback={setupGame}/>) }
          </div>
        </div>
      );
  }
}

export default ChooseGameToPlay;
