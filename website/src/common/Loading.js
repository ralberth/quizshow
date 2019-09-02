import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(4)
    },
    text: {
        fontSize: "x-large"
    }
}));

const Loading = () => {
    const classes = useStyles();
    const [waitTimeOver, setWaitTimeOver] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setWaitTimeOver(true), 1000);
        return () => clearTimeout(id);
    });

    if (waitTimeOver)
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <CircularProgress className={classes.progress} />
                </Grid>
                <Grid item>
                    <Typography className={classes.text}>
                        Loading...
                    </Typography>
                </Grid>
            </Grid>
        );
    else
        return "";
}

export default Loading;
