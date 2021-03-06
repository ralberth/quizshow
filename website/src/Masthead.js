import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import appSyncClient from './graphql/AppSyncClient';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    margin: `0`,
    padding: `0`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
  }
}));

const roles = [
  {
    pathname: '',
    title: 'Home'
  },
  {
    pathname: 'play',
    title: 'Contestant'
  },
  {
    pathname: 'host',
    title: 'Host'
  },
  {
    pathname: 'emcee',
    title: 'Emcee'
  },
];

const Masthead = ({ user, toggleDrawer, location }) => {
    const classes = useStyles();
    const roleMatches = roles.filter(r => location.pathname.split('/')[1] === r.pathname);
    const role = roleMatches.length === 0 ? roles[0] : roleMatches[0];
    const [game, setGame] = useState({ title: '' })
    const gameId = location.pathname.split('/')[2];

    if (role.pathname === 'host' && gameId) {
      appSyncClient.getGameById(gameId, (game) => {
        setGame(game)
      });
    }

    return (
        <div className={classes.root} >
          <AppBar position="relative">
              <Toolbar>
                  <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      className={classes.menuButton}
                      onClick={toggleDrawer}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6"
                      className={classes.title}
                  >
                      { role.title }
                  </Typography>
                  <Typography variant="h6">
                    {
                      role.pathname === 'host' && gameId ?
                        game.title : (role.pathname === 'host' ? '' : user.attributes.nickname)
                    }
                  </Typography>
              </Toolbar>
          </AppBar>

        </div>
    );
}

export default withRouter(Masthead);
