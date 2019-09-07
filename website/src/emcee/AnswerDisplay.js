import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Prompter from './Prompter';
import CancelAbortNextPanel from './CancelAbortNextPanel';
import Leaderboard from '../common/Leaderboard';

// const useStyles = makeStyles(theme => ({
//     text: {
//         padding: 64,
//         fontSize: 'xx-large'
//     },
//     button: {
//         margin: theme.spacing(1)
//     },
// }));

const people = [
    {
        name: 'Rich',
        login: 'ralberth',
        organization: 'Amazon'
    },
    {
        name: 'Chris',
        login: 'csmith',
        organization: 'Foobar'
    },
    {
        name: 'Sue',
        login: 'suesue',
        organization: 'Barbaz'
    }
];

const AnswerDisplay = ({ text, onCancel, onAbort }) => {
    // const classes = makeStyles();
    return (
        <div>
            <Prompter heading="Answer:" body={text} />
            <CancelAbortNextPanel
                onCancel={onCancel}
                onAbort={onAbort} />
            <Leaderboard
                contestants={people} />
        </div>
    );
}

export default AnswerDisplay;
