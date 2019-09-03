import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Homepage from './homepage/Homepage';
import Container from "@material-ui/core/Container";
import GameAdmin from "./GameAdmin";
import CreateGame from "./CreateGame";
import HostGame from "./hostgame/HostGame";
import Masthead from './Masthead';
import { withAuthenticator } from 'aws-amplify-react';
import configureAmplify from "./config/configureAmplify";
import ChooseGameToHost from "./hostgame/ChooseGameToHost";
import FlashMessage from "./FlashMessage";
import ChooseGameToEmcee from "./emcee/ChooseGameToEmcee";
import EmceeGame from "./emcee/EmceeGame";
import ChooseGameToPlay from "./play/ChooseGameToPlay"
import PlayGame from "./play/PlayGame"
import { SignUp, SignIn, ConfirmSignIn, VerifyContact, ConfirmSignUp, ForgotPassword, RequireNewPassword } from 'aws-amplify-react/dist/Auth';

configureAmplify();

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: `0`,
    paddingRight: `0`,
  }
}));

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
                <Route exact path="/create"               component={CreateGame} />
                <Route exact path="/admin"                component={GameAdmin} />
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
