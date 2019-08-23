import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    nomination: {
        padding: theme.spacing(0)
    },
    indexGrid: {
        backgroundColor: "lightblue",
        padding: theme.spacing(1, 2)
    },
    indexTypography: {
        fontWeight: "bold",
        fontSize: "xx-large",
        color: "black"
    },
    nominationLogin: {
        fontStyle: "italic",
        color: "blue",
        padding: theme.spacing(1, 0, 0, 1)
    },
    nominationName: {
        fontWeight: "bold",
        fontSize: "large",
        padding: theme.spacing(0, 0, 1, 1)
    }
}));

const Nomination = ({ index, login, firstName }) => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.nomination}
            elevation={3}
        >
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
            >
                <Grid item className={classes.indexGrid}>
                    <Typography className={classes.indexTypography}>
                        {index}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.nominationLogin}>
                        <Box component="span" textOverflow="ellipsis">
                            {login}
                        </Box>
                    </Typography>
                    <Typography className={classes.nominationName}>
                        <Box component="span" textOverflow="ellipsis">
                            {firstName}
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Nomination;
