import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

const LightbulbFull = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="m9,21c0,0.55 0.45,1 1,1l4,0c0.55,0 1,-0.45 1,-1l0,-1l-6,0l0,1zm3,-19c-3.86,0 -7,3.14 -7,7c0,2.38 1.19,4.47 3,5.74l0,2.26c0,0.55 0.45,1 1,1l6,0c0.55,0 1,-0.45 1,-1l0,-2.26c1.81,-1.27 3,-3.36 3,-5.74c0,-3.86 -3.14,-7 -7,-7z" />
    </SvgIcon>
  );
}

const LightbulbOutline = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

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

const ThemeToggle = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDark = theme.palette.type === 'dark';
  const classes = useStyles();

  return (
    <List subheader={<ListSubheader>Toggle Theme</ListSubheader>}>
      <ListItem button
          className={classes.listItem}
          alignItems="center"
          onClick={toggleTheme}
          onKeyDown={toggleTheme}>
          <ListItemIcon>
            { isDark ? <LightbulbOutline /> : <LightbulbFull /> }
          </ListItemIcon>
          <ListItemText id="switch-list-label-theme" primary={`Light / Dark`} />
          <ListItemSecondaryAction className={classes.secondaryAction}>
            <Switch
              edge="end"
              onChange={toggleTheme}
              checked={isDark}
              inputProps={{ 'aria-labelledby': 'switch-list-label-theme' }}
            />
          </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default ThemeToggle;
