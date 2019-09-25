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
import { authenticatedUserIsEmcee } from '../graphql/configureAppSync';

const sidenavUserItems = [
    {
        text: 'Home',
        path: '/',
        icon: <HomeIcon />
    },
    {
        text: 'Join',
        path: '/play',
        icon: <VideogameAssetIcon />
    }
];

const sidenavEmceeItems = sidenavUserItems.concat([
    {
        text: 'Host',
        path: '/host',
        icon: <TvIcon />
    },
    {
        text: 'Emcee',
        path: '/emcee',
        icon: <MicIcon />
    }
]);

class SideNav extends React.Component {
  // Params: open, toggleDrawer, toggleTheme, user

  state = { isEmcee: false };

  componentDidMount = () =>
    authenticatedUserIsEmcee()
      .then(tf => this.setState({ isEmcee: tf }));

  render() {
    return (
        <SideNavDrawer open={this.props.open} onClose={this.props.toggleDrawer} >
            <SideNavHeader user={this.props.user}
                onClick={this.props.toggleDrawer}
                onKeyDown={this.props.toggleDrawer} />
            <Divider />
            <SideNavLinks
              items={this.state.isEmcee ? sidenavEmceeItems : sidenavUserItems}
              toggleDrawer={this.props.toggleDrawer}
            />
            <Divider />
            <SideNavSignOut />
            <Divider />
            <ThemeToggle toggleTheme={this.props.toggleTheme} />
        </SideNavDrawer>
    );
  }
}

export default SideNav;
