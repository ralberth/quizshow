import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import RandomColorAvatar from './RandomColorAvatar'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
  },
  listSubheader: {
    color: `#fff`,
    fontWeight: `bold`,
    padding: `0 0 0 2rem`,
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    margin: `16px 0 16px 16px`
  },
  points: {
    margin: `16px 0 16px 16px`,
    color: theme.palette.primary.main,
    textAlign: `right`,
  }
}));

const LeaderbooardPoints = withStyles({
  primary: {
    fontWeight: `bold`
  },
  secondary: {
    fontWeight: `500`
  }
})(ListItemText);

const PlayerCard = ({ player }) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <RandomColorAvatar name={player.name} />
      </ListItemAvatar>
      <ListItemText
        className={classes.listItemText}
        primary={`${player.name} (${player.login})`}
        secondary={player.organization}
      />
      { player.points ? <LeaderbooardPoints
                          className={classes.points}
                          primary={`${player.points.toLocaleString()}`}
                          secondary={`pts`}
                        />
                      : null
      }
    </ListItem>
  );
}

const Leaderboard = ({ contestants }) => {
  const classes = useStyles();

  if (!contestants)
    return null;

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          className={classes.listSubheader}
          component="div"
          id="nested-list-subheader"
        >
          Contestants
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        contestants.map(person =>
          [
            <Divider key={`${person}-divider`} component="li" />,
            <PlayerCard key={`${person}-card`} player={person} />
          ]
        )
      }
    </List>
  );
}

export default Leaderboard;
