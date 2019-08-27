import React from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HomepageCard from './HomepageCard';
import HeroText from "../common/HeroText";

const Homepage = (props) => {
    const [ redirectUrl, setRedirectUrl ] = React.useState(null);

    const doCreate = () => setRedirectUrl("/create");
    // const doAdmin  = () => setRedirectUrl("/admin");
    const doJoin   = () => setRedirectUrl("/join");
    // const doHost   = () => setRedirectUrl("/host");
    const doEmcee  = () => setRedirectUrl("/emcee");

    if (!!redirectUrl)
        return (<Redirect to={redirectUrl} />);
    else {
        return (
            <div style={{ padding: 64 }}>
                <HeroText
                    title="Quiz Show"
                    subtitle="Lorem Ipsum dolor sic amet" />

                <Grid container justify="center" spacing={6}>
                    <HomepageCard
                        title="Join"
                        description="Join a Game Show with a code from your emcee."
                        buttonText="Join"
                        onClick={doJoin}
                    />
                    <HomepageCard
                        title="Create"
                        description="Create a new Quiz Show and let people connect to play."
                        buttonText="Create"
                        onClick={doCreate}
                    />
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
            </div>
        );
    }
}

export default Homepage;
