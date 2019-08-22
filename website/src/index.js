import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from "react-helmet";
import Homepage from './homepage/Homepage';
import GameAdmin from "./GameAdmin";
import CreateGame from "./CreateGame";
import HostGame from "./hostgame/HostGame";
import Masthead from './Masthead';
import { withAuthenticator } from 'aws-amplify-react';
import configureAmplify from "./config/configureAmplify";
import ChooseGameToHost from "./hostgame/ChooseGameToHost";
import FlashMessage from "./FlashMessage";
import ChooseGameToEmcee from "./emcee/ChooseGameToEmcee";

configureAmplify();

const IndexPage = () => (
    <Container>
        <Helmet>
            <title>Quiz Show</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
        </Helmet>
        <BrowserRouter>
            <Masthead />
            <CssBaseline />
            <FlashMessage />
            <Switch>
                <Route exact path="/"                     component={Homepage} />
                <Route exact path="/create"               component={CreateGame} />
                <Route exact path="/admin"                component={GameAdmin} />
                <Route exact path="/host"                 component={ChooseGameToHost} />
                <Route exact path="/host/:gameId"         component={HostGame} />
                <Route exact path="/emcee"                component={ChooseGameToEmcee} />
                <Route exact path="/emcee/:gameId"        component={HostGame} />
            </Switch>
        </BrowserRouter>
    </Container>
);

const RootPage = withAuthenticator(IndexPage);

ReactDOM.render(<RootPage />, document.getElementById('root'));
