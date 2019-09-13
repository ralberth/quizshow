import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 300,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 440,
    },
    [theme.breakpoints.up('lg')]: {
      width: 440,
    },
    flexShrink: 0,
  },
  drawerPaper: {
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 300,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 440,
    },
    [theme.breakpoints.up('lg')]: {
      width: 440,
    },
    opacity: 0.98,
  },
}));

const SideNavDrawer = ({ open, onClose, children }) => {
  const classes = useStyles();

  return (
      <Drawer open={open}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="temporary"
          anchor="left"
          onClose={onClose}
          >
        { children }
      </Drawer>
  );
}

export default SideNavDrawer;
