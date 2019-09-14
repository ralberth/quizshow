import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  listItem: {
    paddingLeft: theme.spacing(4),
  },
}));

export const SideNavLink = ({ text, path, icon, onClick, onKeyDown }) => {
  const classes = useStyles();

  return (
    <ListItem button
        className={classes.listItem}
        alignItems="center"
        component={Link}
        to={path}
        onClick={onClick}
        onKeyDown={onKeyDown}>
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
  )
}

const SideNavLinks = ({ items, toggleDrawer }) => (
  <List>
    {
      items.map(item => (
        <SideNavLink key={item.text}
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
            {...item} />
      ))
    }
  </List>
);

export default SideNavLinks;
