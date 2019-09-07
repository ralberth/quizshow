import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Nomination from "../common/Nomination";
import appSyncClient from "../util/AppSyncClient";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "darkgray"
    }
}));

const PEOPLE = [
    { login: 'joeuser', firstName: "Joe" },
    { login: 'ssmith', firstName: "Sue" },
    { login: 'asultan', firstName: "Abdul" },
    { login: 'jpeterson', firstName: "Jason" }
];

const NominationGrid = ({ quesId }) => {
    const classes = useStyles();

    useEffect(() => {
        const subscription = appSyncClient.subNominateContestant(quesId, (res) => {
            console.log("Nominated!");
            console.log(res);
        });
        return () => subscription.unsubscribe();
    });

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
