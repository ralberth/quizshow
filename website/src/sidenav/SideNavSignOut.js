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
    paddingLeft: theme.spacing(4),
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
