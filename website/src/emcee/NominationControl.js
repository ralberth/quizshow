import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Nomination from "../common/Nomination";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "#eee"
    }
}));

const PEOPLE = [
    { login: 'joeuser', firstName: "Joe" },
    { login: 'ssmith', firstName: "Sue" },
    { login: 'asultan', firstName: "Abdul" },
    { login: 'jpeterson', firstName: "Jason" }
];

const NominationControl = () => {
    const classes = useStyles();
    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={4}
        >
            <Grid item xs={12} sm={4}>
                <Grid
                    container
                    direction="row"
                    spacing={8}
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                        >
                            Correct
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                        >
                            Wrong
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container direction="column" spacing={2}>
                    {PEOPLE.map((person, indx) => (
                        <Grid item key={person.login}>
                            <Nomination
                                index={indx + 1}
                                login={person.login}
                                firstName={person.firstName} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default NominationControl;
