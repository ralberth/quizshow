import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "darkgray"
    },
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
                        {login}
                    </Typography>
                    <Typography className={classes.nominationName}>
                        {firstName}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

const PEOPLE = [
    { login: 'joeuser', firstName: "Joe" },
    { login: 'ssmith', firstName: "Sue" },
    { login: 'asultan', firstName: "Abdul" },
    { login: 'jpeterson', firstName: "Jason" }
];

const NominationGrid = () => {
    const classes = useStyles();
    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={2}
        >
            {PEOPLE.map((person,indx) => (
                <Grid item key={person.login}>
                    <Nomination
                        index={indx + 1}
                        login={person.login}
                        firstName={person.firstName} />
                </Grid>
            ))}
        </Grid>
    );
}

export default NominationGrid;
