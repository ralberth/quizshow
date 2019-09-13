import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import TvIcon from '@material-ui/icons/Tv';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from '@material-ui/core/Typography';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  title: {
    margin: theme.spacing(0, 1),
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    // opacity: 0.98,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  listItem: {
    padding: `16px`,
  }
}));

const sidenavItems = [
  {
    text: 'Home',
    path: '/',
    icon: <HomeIcon />
  },
  {
    text: 'Join',
    path: '/play',
    icon: <VideogameAssetIcon />
  },
  {
    text: 'Host',
    path: '/host',
    icon: <TvIcon />
  },
  {
    text: 'Emcee',
    path: '/emcee',
    icon: <RecordVoiceOverIcon />
  },
];

const SideNav = ({ open, toggleDrawer }) => {
  const classes = useStyles();
  // const theme = createMuiTheme({ palette: { type: 'dark' } });

  return (
    // <ThemeProvider theme={theme}>
      <Drawer open={open}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="temporary"
          anchor="left"
          onClose={toggleDrawer}
          >
          <div className={classes.drawerHeader}>
            <Typography className={classes.title} variant="h6">Quizshow Menu</Typography>
            <IconButton onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
                aria-label="close drawer">
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {
              sidenavItems.map(({ text, path, icon }) => (
                <ListItem button key={text}
                    className={classes.listItem}
                    component={Link}
                    to={path}
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}>
                  <ListItemIcon>{ icon }</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))
            }
          </List>
      </Drawer>
    // </ThemeProvider>
  );
}

export default SideNav;