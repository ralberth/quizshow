import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    div: {
      paddingBottom: `8px`,
      paddingTop: `48px`,
    },
    heading: {
      fontWeight: "550"
    },
    button: {
        fontSize: "large"
    }
}));

const HeroText = ({ title, subtitle }) => {
    const classes = useStyles();
    return (
        <div className={classes.div}>
            <Typography
                className={classes.heading}
                component="h1"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                {title}
            </Typography>
            <p style={{ textAlign: 'center', fontSize: `2rem` }}>
                {subtitle}
            </p>
        </div>
    );
}

export default HeroText;
