import React from 'react';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import TvIcon from '@material-ui/icons/Tv';
import MicIcon from '@material-ui/icons/Mic';
import SideNavDrawer from './SideNavDrawer';
import SideNavHeader from './SideNavHeader';
import SideNavSignOut from './SideNavSignOut';
import SideNavLinks from './SideNavLinks';
import ThemeToggle from './ThemeToggle';

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
    icon: <MicIcon />
  },
];

const SideNav = ({ open, toggleDrawer, toggleTheme, user }) => {

  return (
      <SideNavDrawer open={open} onClose={toggleDrawer} >
          <SideNavHeader user={user}
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer} />
          <Divider />
          <SideNavLinks items={sidenavItems} toggleDrawer={toggleDrawer} />
          <Divider />
          <SideNavSignOut />
          <Divider />
          <ThemeToggle toggleTheme={toggleTheme} />
      </SideNavDrawer>
  );
}

export default SideNav;
