import React, { useState } from 'react'
import { Redirect } from 'react-router';
import _ from 'lodash';
import gql from "graphql-tag"
import PickGameDialog from "../common/PickGameDialog";
import useAppSyncQuery from "../hooks/useAppSyncQuery";

const ALL_GAMES_GQL = gql`
    query Query {
        listGames {
            gameId
            emcee
            title
        }
    }
`;

const ChooseGameToPlay = () => {
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
          <PickGameDialog
              isOpen={dialogVisibility}
              games={gameList}
              onGameChosen={setupGame}
              cancelUri="/"
          />
      );
  }
}

export default ChooseGameToPlay;
