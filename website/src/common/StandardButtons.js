import React from 'react';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles, styled } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    }
}));

export const LargeButton = styled(Button)({
    margin: '10px',
    padding: '8px',
    minWidth: '10rem',
    minHeight: '3rem'
});

export const CancelButton = ({ onCancel }) => {
    const classes = useStyles();
    return (
        <LargeButton
            variant="contained"
            onClick={onCancel}
        >
            <CancelIcon className={classes.iconLeft} />
            Cancel
        </LargeButton>
    );
}

export const AbortButton = ({ onAbort }) => {
    const classes = useStyles();
    return (
        <LargeButton
            variant="contained"
            color="secondary"
            onClick={onAbort}
        >
            <DeleteIcon className={classes.iconLeft} />
            Abort
        </LargeButton>
    );
}

export const NextButton = ({ onNext }) => {
    const classes = useStyles();
    return (
        <LargeButton
            variant="contained"
            color="primary"
            onClick={onNext}
        >
            Next
            <NavigateNextIcon className={classes.iconRight} />
        </LargeButton>
    );
}

