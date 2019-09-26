import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => {
  const isDark = theme.palette.type === 'dark';
  return {
    question: {
      fontWeight: `bold`,
      margin: `2rem`,
      textAlign: `center`,
    },
    tippyTopGrid: {
      position: `fixed`,
      height: `2rem`,
      width: `100%`,
      maxWidth: `1280px`,
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
    },
    categoryGrid: {
      maxWidth: `420px`,
      margin: theme.spacing(1, 2),
    },
    subtitle: {
      color: isDark ? theme.palette.text.primary : grey[700],
      fontWeight: `bold`,
    },
  };
});

const Buzzer = withStyles(({ palette }) => {
  console.log('palette:', palette);
  return {
      root: {
      width: `10rem`,
      height: `10rem`,
      // backgroundColor: `#cf2a27`,
      backgroundColor: palette.secondary.main,
      color: `#fff`,
      fontSize: `2rem`,
      fontWeight: `bold`,
      "&:hover": {
        color: palette.secondary.main,
      },
    }
  }
})(Fab);

const ContestantQuestion = ({ question, buzzerDisabled, onBuzz }) => {
  const classes = useStyles();

  return (
      <Box height="calc(100% - 64px)" >
        <Grid container direction="column" >

          {/* Category */}
          <Grid container className={classes.tippyTopGrid} >
            <Grid item xs={12} sm={12} md={12} className={classes.categoryGrid}>
              <Typography noWrap className={classes.subtitle} variant="subtitle1" >
                {question.categoryName} for {question.points} points:
              </Typography>
            </Grid>
          </Grid>

          {/* Question */}
          <Grid container className={classes.topGrid} justify="center" alignItems="center" >
            <Grid item className={classes.questionGrid}>
              <Typography className={classes.question} variant="h5" >
                { question.question }
              </Typography>
            </Grid>
          </Grid>

          {/* Buzzer */}
          <Grid className={classes.bottomGrid} >
            <Grid container justify="center" alignItems="center" >
              <Buzzer
                aria-label="add"
                disabled={buzzerDisabled}
                onClick={onBuzz}
              >
                BUZZ
              </Buzzer>
            </Grid>
          </Grid>

        </Grid>
      </Box>
  )
}

export default ContestantQuestion
