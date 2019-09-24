import React from 'react';
import CancelAbortNextPanel from './CancelAbortNextPanel';
import Grid from '@material-ui/core/Grid';
import QuesAnsHeader from './QuesAnsHeader';

const QuestionDisplay = ({ ques, onCancel, onAbort, onNext }) => (
    <Grid container direction="column" justify="flex-start" alignItems="center">
        <Grid item>
            <QuesAnsHeader ques={ques}/>
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
