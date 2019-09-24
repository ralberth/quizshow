import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Modal } from '@material-ui/core';
import QuestionBox from './QuestionBox';
import { makeStyles } from '@material-ui/core/styles';
import Leaderboard from '../common/Leaderboard';

const useStyles = makeStyles(theme => ({
    container: {
      padding: theme.spacing(8)
    }
}));

const Faceoff = ({ question, nominees }) => {
    const classes = useStyles();

    if (question && ['display', 'open'].includes(question.state)) {
        return (
            <Modal
                open={true}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <Container className={classes.container}>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="flex-start"
                        spacing={8}
                    >
                        <Grid item xs={8}>
                            <QuestionBox
                                category={question.categoryName}
                                points={question.points}
                                question={question.question} />
                        </Grid>
                        <Grid item xs={4}>
                            <Paper>
                                <Leaderboard people={nominees} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Modal>
        );
    } else {
        return <div/>;
    }
}

export default Faceoff;
