import { Dialog, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200]
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[700]
    },
    buttonBar: {
        backgroundColor: theme.palette.grey[100]
    }
});

const QuizDialog = withStyles(styles)(props => {
    const { title, isOpen, onCancel, children, onAccept, classes } = props;

    return (
        <Dialog open={isOpen} onClose={onCancel}>
            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>

            <DialogContent>{children}</DialogContent>

            <DialogActions className={classes.buttonBar}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onAccept}>OK</Button>
            </DialogActions>
        </Dialog>
    );
});

export default QuizDialog;
