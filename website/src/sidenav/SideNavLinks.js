import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
