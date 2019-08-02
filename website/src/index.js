import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from "react-helmet";
import Homepage from './homepage/Homepage';
import CreateQuiz from "./CreateQuiz";
import HostGame from "./hostgame/HostGame";

const IndexPage = (props) => (
    <Container>
        <Helmet>
            <title>Quiz Show</title>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
        </Helmet>
        <CssBaseline />
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/createquiz" component={CreateQuiz} />
                <Route path="/hostgame/:gameid" component={HostGame} />
            </Switch>
        </BrowserRouter>
    </Container>
);

ReactDOM.render(<IndexPage />, document.getElementById('root'));
