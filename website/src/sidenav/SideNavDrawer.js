import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.down('sm')]: {
      width: 308,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 358,
    },
    [theme.breakpoints.up('md')]: {
      width: 408,
    },
    flexShrink: 0,
  },
  drawerPaper: {
    [theme.breakpoints.down('sm')]: {
      width: 308,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 358,
    },
    [theme.breakpoints.up('md')]: {
      width: 408,
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
