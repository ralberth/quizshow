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
    [theme.breakpoints.down('md')]: {
      maxWidth: 400,
    },
  },
  listItem: {
    paddingLeft: `8px`,
    paddingRight: `8px`,
  },
  listSubheader: {
    minHeight: '64px',
    lineHeight: '64px',
    color: `#fff`,
    fontSize: '1.2rem',
    fontWeight: `550`,
    padding: `0 0 0 2rem`,
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    margin: `16px 0 16px 16px`
  },
  score: {
    margin: `16px 0 16px 0`,
    color: theme.palette.primary.light,
    textAlign: `left`,
    minWidth: `3rem`,
  }
}));

const LeaderbooardPoints = withStyles({
  primary: {
    fontWeight: `bold`,
  },
  secondary: {
    fontWeight: `500`,
  }
})(ListItemText);

const TruncatedListItemText = withStyles({
  primary: {
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  secondary: {
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
})(ListItemText);

const PlayerCard = ({ player }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem} alignItems="flex-start">
      <ListItemAvatar>
        <RandomColorAvatar name={player.name} />
      </ListItemAvatar>
      <TruncatedListItemText
        className={classes.listItemText}
        primary={`${player.name} (${player.login})`}
        secondary={player.organization}
      />
      { player.score ? <LeaderbooardPoints
                          className={classes.score}
                          primary={`${player.score.toLocaleString()}`}
                          secondary={`pts`}
                        />
                      : null
      }
    </ListItem>
  );
}

const Leaderboard = ({ header, people }) => {
  const classes = useStyles();

  if (!people)
    people = [];

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
          { header === undefined ? `Contestants` : header }
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        people.map(person =>
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
