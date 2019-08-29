import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles(theme => ({
    icon: {
        paddingRight: theme.spacing(1)
    },
    topLabel: {
        padding: theme.spacing(2, 0),
        fontSize: 'x-large'
    },
    text: {
        padding: theme.spacing(5),
        fontSize: 'xx-large'
    }
}));

const Prompter = ({ heading, body }) => {
    const classes = useStyles();
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <QuestionAnswerIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography variant="h3" className={classes.topLabel}>
                        {heading}
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.text}>
                {body}
            </Typography>
        </div>
    );
}

export default Prompter;
