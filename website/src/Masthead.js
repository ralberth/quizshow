import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from "@aws-amplify/auth"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Masthead = (props) => {
    const classes = useStyles();

    const [ anchorElement, setAnchorElement ] = useState(null);
    const [ open, setOpen ] = useState(false);
    const [ nav, setNav ] = useState("");
    const [ username, setUsername ] = useState("");

    Auth.currentAuthenticatedUser()
        .then((userObj) => setUsername(userObj.attributes.nickname));

    const menuOpen = (event) => {
        setAnchorElement(event.currentTarget);
        setOpen(true);
    }

    const menuClose = () => setOpen(false);

    if (nav.length > 0) {
        return (<Redirect to={nav}/>);
    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            className={classes.menuButton}
                            onClick={menuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6"
                            className={classes.title}
                        >
                            Quiz Show
                        </Typography>
                        <Typography variant="h6">{username}</Typography>
                    </Toolbar>
                </AppBar>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorElement}
                    keepMounted
                    open={open}
                    onClose={menuClose}
                >

                    <MenuItem onClick={() => setNav("/")}>Homepage</MenuItem>
                    {/* <MenuItem onClick={() => setNav("/create")}>Create a new quiz show</MenuItem> */}
                    {/* <MenuItem onClick={() => setNav("/admin")}>Admin your quiz shows</MenuItem> */}
                    <MenuItem onClick={() => setNav("/emcee")}>Emcee a quiz show you own</MenuItem>
                    <MenuItem onClick={() => setNav("/host")}>Host a quiz show</MenuItem>
                    <MenuItem>Logout</MenuItem>
                    <MenuItem onClick={() => setNav("https://github.com/ralberth/quizshow")}>
                        Quiz Show on Github.com
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default Masthead;
