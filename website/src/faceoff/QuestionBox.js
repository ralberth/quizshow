import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(6),
    },
    catgAndPoints: {
        fontStyle: "italic",
        paddingBottom: theme.spacing(6)
    }
}));

const QuestionBox = ({ category, points, question }) => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.root}
            elevation={3}
        >
            <Typography variant="h4" className={classes.catgAndPoints}>
                {category} for {points} points
            </Typography>
            <Typography variant="h2">
                {question}
            </Typography>
        </Paper>
    );
}

export default QuestionBox;
