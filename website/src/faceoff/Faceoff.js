import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Modal } from '@material-ui/core';
import QuestionBox from './QuestionBox';
// import { styled } from '@material-ui/styles';

const Faceoff = ({ isOpen, category, prize, question, answer }) => {

    return (
        <Modal
            open={isOpen}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
        >
            <Container>
                <Grid
                    container
                    spacing={1}
                    justify="space-evenly"
                    alignItems="flex-start"
                >
                    <Grid item xs="9">
                        <QuestionBox
                            category={category}
                            prize={prize}
                            question={question}
                            answer={answer} />
                    </Grid>
                    <Grid item>
                        <Paper>place where each pop-up player goes</Paper>
                    </Grid>
                </Grid>
            </Container>
        </Modal>
    );
}

export default Faceoff;
