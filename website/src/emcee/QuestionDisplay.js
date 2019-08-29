import React from 'react';
import Grid from '@material-ui/core/Grid';
import Prompter from './Prompter';
import CancelAbortNextPanel from './CancelAbortNextPanel';

const QuestionDisplay = ({ text, onCancel, onAbort, onNext }) => (
    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
    >
        <Grid item>
            <Prompter heading="Question" body={text} />
        </Grid>
        <Grid item>
            <CancelAbortNextPanel
                onCancel={onCancel}
                onAbort={onAbort}
                onNext={onNext} />
        </Grid>
    </Grid>
);

export default QuestionDisplay;
