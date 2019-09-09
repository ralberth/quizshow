import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ContestantRenderMode from './ContestantRenderMode';

const useStyles = makeStyles(() => {
  return {
    question: {
      fontWeight: `bold`,
      margin: `2rem`,
      textAlign: `center`,
    },
    topGrid: {
      position: `fixed`,
      height: `55%`,
      width: `100%`,
      maxWidth: `1280px`,
    },
    bottomGrid: {
      position: `fixed`,
      height: `35%`,
      width: `100%`,
      maxWidth: `1280px`,
      bottom: 0,
    },
    questionGrid: {
      maxWidth: `420px`,
    }
  };
});

const Buzzer = withStyles({
  root: {
    width: `10rem`,
    height: `10rem`,
    backgroundColor: `#cf2a27`,
    color: `#fff`,
    fontSize: `2rem`,
    fontWeight: `bold`,
  }
})(Fab);

const ContestantQuestion = ({ question: { question }, mode }) => {
  const classes = useStyles();
  const buzzerDisabled = mode !== ContestantRenderMode.buzzerEnabled;

  return (
    <div>
      <Box height="calc(100% - 64px)" >

        <Grid container direction="column" >

          <Grid container className={classes.topGrid} justify="center" alignItems="center" >

            <Grid item className={classes.questionGrid}>

              <Typography className={classes.question} variant="h5" >
                { question }
              </Typography>

            </Grid>

          </Grid>

          <Grid className={classes.bottomGrid} >
            <Grid container justify="center" alignItems="center" >

              <Buzzer aria-label="add" disabled={buzzerDisabled} >
                BUZZ
              </Buzzer>

            </Grid>
          </Grid>

        </Grid>

      </Box>
    </div>
  )
}

export default ContestantQuestion
