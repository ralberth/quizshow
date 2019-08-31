import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Modal } from '@material-ui/core';
import QuestionBox from './QuestionBox';
import { makeStyles } from '@material-ui/core/styles';
import NominationGrid from './NominationGrid';

const useStyles = makeStyles(theme => ({
    container: {
      padding: theme.spacing(8)
    }
}));

const Faceoff = ({ ques }) => {
    const classes = useStyles();

    if (ques && ['display', 'open'].includes(ques.state)) {
        return (
            <Modal
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
                                category="Catg"
                                points={ques.points}
                                question={ques.question} />
                        </Grid>
                        <Grid item xs={4}>
                            <NominationGrid />
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
