import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { withAuthenticator } from 'aws-amplify-react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact } from 'aws-amplify-react/dist/Auth';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChooseGame from "./common/choosegame/ChooseGame";
// import CreateGame from "./CreateGame";
import EmceeGame from "./emcee/EmceeGame";
import FlashMessage from "./FlashMessage";
// import GameAdmin from "./GameAdmin";
import { configureAmplify } from "./graphql/configureAppSync";
import Homepage from './homepage/Homepage';
import HostGame from "./hostgame/HostGame";
import Masthead from './Masthead';
import PlayGame from "./play/PlayGame";

configureAmplify();

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: `0`,
    paddingRight: `0`,
  }
}));

const ChooseGameToHost  = () => <ChooseGame uriPrefix="/host"  />;
const ChooseGameToEmcee = () => <ChooseGame uriPrefix="/emcee" />;
const ChooseGameToPlay  = () => <ChooseGame uriPrefix="/play"  />;

const IndexPage = () => {
  const classes = useStyles();
  return (
    <BrowserRouter id="BrowserRouter" >
        <Masthead />
        <CssBaseline />
        <FlashMessage />
        <Container id="Container" className={classes.container} >
            <Switch id="Switch">
                <Route exact path="/"                     component={Homepage} />
                {/* <Route exact path="/create"               component={CreateGame} /> */}
                {/* <Route exact path="/admin"                component={GameAdmin} /> */}
                <Route exact path="/host"                 component={ChooseGameToHost} />
                <Route exact path="/host/:gameId"         component={HostGame} />
                <Route exact path="/emcee"                component={ChooseGameToEmcee} />
                <Route exact path="/emcee/:gameId"        component={EmceeGame} />
                <Route exact path="/play"                 component={ChooseGameToPlay} />
                <Route exact path="/play/:gameId"         component={PlayGame} />
            </Switch>
        </Container>
    </BrowserRouter>
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
    <SignIn/>,
    <ConfirmSignIn/>,
    <VerifyContact/>,
    <SignUp {...signUpArgs} />,
    <ConfirmSignUp/>,
    <ForgotPassword/>,
    <RequireNewPassword />
]);

ReactDOM.render(<RootPage />, document.getElementById('root'));
