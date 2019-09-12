import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HomepageCard from './HomepageCard';
import HeroText from "../common/HeroText";

const useStyles = makeStyles(() => ({
  root: {
    margin: `auto`,
  },
}));

const Homepage = () => {
    const classes = useStyles();
    const [ redirectUrl, setRedirectUrl ] = React.useState(null);

    // const doCreate = () => setRedirectUrl("/create");
    // const doAdmin  = () => setRedirectUrl("/admin");
    const doJoin   = () => setRedirectUrl("/play");
    // const doHost   = () => setRedirectUrl("/host");
    const doEmcee  = () => setRedirectUrl("/emcee");

    if (redirectUrl)
        return (<Redirect to={redirectUrl} />);
    else {
        return (
            <Grid container className={classes.root} justify="center" alignItems="center" >
                <HeroText
                    title="Quiz Show" />
                    {/* subtitle="Lorem Ipsum dolor sic amet" /> */}

                <Grid container justify="center" >
                    <HomepageCard
                        title="Join"
                        description="Join a Game Show with a code from your emcee."
                        buttonText="Join"
                        onClick={doJoin}
                    />
                    {/* <HomepageCard
                        title="Create"
                        description="Create a new Quiz Show and let people connect to play."
                        buttonText="Create"
                        onClick={doCreate}
                    /> */}
                    {/* <HomepageCard
                        title="Admin"
                        description="Reconnect, manage, and close Quiz Shows that you emcee."
                        buttonText="Admin"
                        onClick={doAdmin}
                    /> */}
                    <HomepageCard
                        title="Emcee"
                        description="Run a Quiz Show that you created."
                        buttonText="Emcee"
                        onClick={doEmcee}
                    />
                    {/* <HomepageCard
                        title="Host"
                        description="Show the game board on a big screen for all players."
                        buttonText="Host"
                        onClick={doHost}
                    /> */}
                </Grid>
            </Grid>
        );
    }
}

export default Homepage;
