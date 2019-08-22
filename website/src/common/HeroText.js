import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    div: {
        padding: 28
    },
    heading: {
      fontSize: "medium",
      fontWeight: "bold"
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
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                {title}
            </Typography>
            <p style={{ textAlign: 'center' }}>
                {subtitle}
            </p>
        </div>
    );
}

export default HeroText;
