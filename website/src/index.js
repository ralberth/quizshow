import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { withAuthenticator } from 'aws-amplify-react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact } from 'aws-amplify-react/dist/Auth';
import React, { useState, useEffect } from 'react';
import Auth from "@aws-amplify/auth";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChooseGame from "./common/choosegame/ChooseGame";
import EmceeGame from "./emcee/EmceeGame";
import FlashMessage from "./FlashMessage";
import { configureAmplify } from "./graphql/configureAppSync";
import Homepage from './homepage/Homepage';
import HostGame from "./hostgame/HostGame";
import Masthead from './Masthead';
import SideNav from './sidenav/SideNav';
import PlayGame from "./play/PlayGame";
import Toolbar from '@material-ui/core/Toolbar';
import ScrollTop from './common/ScrollTop';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import CreateGame from "./CreateGame";
// import GameAdmin from "./GameAdmin";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { authenticatedUserIsEmcee } from './graphql/configureAppSync';

configureAmplify();

const useStyles = makeStyles(() => ({
  container: {
    paddingLeft: `0`,
    paddingRight: `0`,
  }
}));

const ChooseGameToHost  = () => <ChooseGame uriPrefix="/host"  />;
const ChooseGameToEmcee = () => <ChooseGame uriPrefix="/emcee" />;
const ChooseGameToPlay  = () => <ChooseGame uriPrefix="/play"  />;

const RouteNotFound = () => (
  <Box>
    <Typography variant="h5" align="center" style={{ padding: 24 }}>
      Page not found
    </Typography>
  </Box>
);

const IndexPage = () => {
  const [ open, setOpen ] = useState(false);
  const [ user, setUser] = useState({ attributes: { nickname: '' } });
  const [ isEmcee, setEmcee ] = useState(false);
  const [ theme, setTheme ] = useState('dark');
  const muiTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });
  const classes = useStyles();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open);
  };

  useEffect(() => {
    const auth = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    };
    auth();
    return () => {
      Auth.signOut()
    };
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      const isEmcee = await authenticatedUserIsEmcee();
      setEmcee(isEmcee);
    };
    getGroups();
  }, []);

  const EmceeOnlyRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isEmcee ? <Component {...props} /> : <RouteNotFound/>)}
    />
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter id="BrowserRouter" >
          <CssBaseline />
          <SideNav {...{ open, toggleDrawer, toggleTheme, user }} />
          <FlashMessage />
          <Container id="Container" className={classes.container} >
              <Masthead {...{ user, toggleDrawer }} />
              <Toolbar id="back-to-top-anchor" />
              <Switch id="Switch">
                <Route exact path="/"                       component={Homepage} />
                <Route exact path="/play"                   component={ChooseGameToPlay} />
                <Route exact path="/play/:gameId"           component={PlayGame} />
                {/* <Route exact path="/create"               component={CreateGame} /> */}
                {/* <Route exact path="/admin"                component={GameAdmin} /> */}
                <EmceeOnlyRoute exact path="/host"          component={ChooseGameToHost} />
                <EmceeOnlyRoute exact path="/host/:gameId"  component={HostGame} />
                <EmceeOnlyRoute exact path="/emcee"         component={ChooseGameToEmcee} />
                <EmceeOnlyRoute exact path="/emcee/:gameId" component={EmceeGame} />
                <Route path='*' exact={true}                component={RouteNotFound}/>
              </Switch>
              <ScrollTop threshold={100} selector={'#back-to-top-anchor'} >
                <Fab color="secondary" size="large" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
          </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const signUpArgs = {
    signUpConfig: {
        header: "Create a new Quiz Show Account!",
        signUpFields: [
            {
                key: "nickname",
                label: "Nickname / Screenname",
                type: "string",
                required: true
            },
            {
                key: "custom:organization",
                label: "Organization",
                type: "string",
                required: false
            }
        ],
        hiddenDefaults: [ 'phone_number' ]
    }
};

const RootPage = withAuthenticator(IndexPage, false, [
    <SignIn key={`SignIn`} />,
    <ConfirmSignIn key={`ConfirmSignIn`}/>,
    <VerifyContact key={`VerifyContact`} />,
    <SignUp key={`SignUp`} {...signUpArgs} />,
    <ConfirmSignUp key={`ConfirmSignUp`} />,
    <ForgotPassword key={`ForgotPassword`} />,
    <RequireNewPassword key={`RequireNewPassword`} />
]);

ReactDOM.render(<RootPage />, document.getElementById('root'));
