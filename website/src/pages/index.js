import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from "react-helmet";
import Homepage from '../components/homepage/Homepage';
import CreateQuiz from "../components/CreateQuiz";
import GameBoard from "../components/GameBoard";

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
                <Route path="/gameboard" component={GameBoard} />
            </Switch>
        </BrowserRouter>
    </Container>
);

export default IndexPage;
