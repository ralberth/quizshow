import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from "@aws-amplify/auth";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  listItem: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      padding: theme.spacing(3, 8),
    },
    [theme.breakpoints.between('md', 'lg')]: {
      padding: theme.spacing(3, 12),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(3, 12),
    },
  },
  secondaryAction: {
    right: theme.spacing(3)
  },
}));

const SideNavSignOut = () => {
  const classes = useStyles();

  return (
    <List>
      <ListItem button
          className={classes.listItem}
          alignItems="center"
          onClick={() => Auth.signOut()}
          onKeyDown={() => Auth.signOut()}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={`Sign Out`} />
      </ListItem>
    </List>
  );
}

export default SideNavSignOut;
