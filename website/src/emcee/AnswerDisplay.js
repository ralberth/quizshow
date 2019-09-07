import React from 'react';
import Prompter from './Prompter';
import CancelAbortNextPanel from './CancelAbortNextPanel';
import Leaderboard from '../common/Leaderboard';


const AnswerDisplay = ({ text, people, onCancel, onAbort }) => {
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
