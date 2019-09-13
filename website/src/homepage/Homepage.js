import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HomepageCard from './HomepageCard';
import HeroText from "../common/HeroText";

const useStyles = makeStyles(() => ({
  root: {
    margin: `auto`,
  },
}));

const cards = [
  {
    title: "Join",
    description: "Join a Game Show with a code from your emcee.",
    buttonText: "Join",
    path: "/play",
  },
  {
    title: "Emcee",
    description: "Run a Quiz Show that you created.",
    buttonText: "Emcee",
    path: "/emcee",
  },
  // {
  //   title: "Host",
  //   description: "Show the gameboard on a big screen for all players.",
  //   buttonText: "Host",
  //   path: "/host",
  // },
  // {
  //   title: "Create",
  //   description: "Create a new Quiz Show and let people connect to play.",
  //   buttonText: "Create",
  //   path: "/create",
  // },
  // {
  //   title: "Admin",
  //   description: "Reconnect, manage, and close Quiz Shows that you emcee.",
  //   buttonText: "Admin",
  //   path: "/admin",
  // },
]

const Homepage = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} justify="center" alignItems="center" >
            <HeroText
                title="Quiz Show" />
                {/* subtitle="Lorem Ipsum dolor sic amet" /> */}
            <Grid container justify="center" >
              { cards.map(card => <HomepageCard key={card.title} {...card} />) }
            </Grid>
        </Grid>
    );
}

export default Homepage;
