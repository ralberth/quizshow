import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Prompter from './Prompter';
import CancelAbortNextPanel from './CancelAbortNextPanel';

// const useStyles = makeStyles(theme => ({
//     text: {
//         padding: 64,
//         fontSize: 'xx-large'
//     },
//     button: {
//         margin: theme.spacing(1)
//     },
// }));

const AnswerDisplay = ({ text, onCancel, onAbort }) => {
    // const classes = makeStyles();
    return (
        <div>
            <Prompter heading="Answer:" body={text} />

            <CancelAbortNextPanel
                onCancel={onCancel}
                onAbort={onAbort} />
        </div>
    );
}

export default AnswerDisplay;
