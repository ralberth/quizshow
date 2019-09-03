import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import RandomColorAvatar from '../common/RandomColorAvatar'

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
  }
}));

const PlayerLeaderboard = () => {
  const classes = useStyles();

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
          Leaderboard
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <RandomColorAvatar name={'Tyler'} />
        </ListItemAvatar>
        <ListItemText
          className={classes.listItemText}
          primary="Name (login)"
          secondary="Organization"
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <RandomColorAvatar name={'Tyler'} />
        </ListItemAvatar>
        <ListItemText
          className={classes.listItemText}
          primary="Name (login)"
          secondary="Organization"
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <RandomColorAvatar name={'Tyler'} />
        </ListItemAvatar>
        <ListItemText
          className={classes.listItemText}
          primary="Name (login)"
          secondary="Organization"
        />
      </ListItem>
    </List>
  );
}

export default PlayerLeaderboard;
