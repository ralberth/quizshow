import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles(theme => {
  const isDark = theme.palette.type === 'dark';
  return {
    root: {
      height: `100%`,
      width: `100%`,
      margin: `0`,
      padding: `0`,
    },
    progress: {
        margin: theme.spacing(4)
    },
    text: {
      color: isDark ? theme.palette.text.primary : grey[700],
      fontWeight: `bold`,
      margin: `10rem 0 0 0`,
      textAlign: `center`,
    },
    bottomProgress: {
      position: `fixed`,
      bottom: `0`,
      width: `100%`,
    }
  }
});

const Loading = () => {
    const classes = useStyles();
    const [waitTimeOver, setWaitTimeOver] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setWaitTimeOver(true), 1000);
        return () => clearTimeout(id);
    });

    if (waitTimeOver)
        return (
          <div className={classes.root} >
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <Typography className={classes.text} variant="h5">
                        Loading...
                    </Typography>
                </Grid>
                <Grid item>
                    <CircularProgress className={classes.progress} />
                </Grid>
            </Grid>
            <LinearProgress className={classes.bottomProgress} color="secondary" variant="query" />
          </div>
        );
    else
        return "";
}

export default Loading;
