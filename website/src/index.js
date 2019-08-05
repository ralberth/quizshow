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

const IndexPage = (props) => (
    <Container>
        <Helmet>
            <title>Quiz Show</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
        </Helmet>
        <BrowserRouter>
            <Masthead/>
            <CssBaseline />
            <Switch>
                <Route exact path="/"           component={Homepage} />
                <Route exact path="/creategame" component={CreateGame} />
                <Route exact path="/gameadmin"  component={GameAdmin} />
                <Route exact path="/hostgame"   component={HostGame} />
            </Switch>
        </BrowserRouter>
    </Container>
);

ReactDOM.render(<IndexPage />, document.getElementById('root'));
