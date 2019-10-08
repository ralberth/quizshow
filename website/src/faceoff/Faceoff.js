import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Leaderboard from '../common/Leaderboard'
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => {
  const isDark = theme.palette.type === 'dark';
  return {
    appBar: {
      position: 'relative',
      minHeight: '86px',
    },
    appBarTitles: {
      lineHeight: `5rem`,
      fontSize: '2rem',
      fontWeight: `550`,
    },
    category: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    points: {
      textAlign: `right`,
      marginRight: theme.spacing(2),
    },
    dialogContent: {
      padding: `0 0 0 0`,
    },
    contentContainer: {
      padding: `2rem`,
      margin: `0 0 0 0`,
      height: `100%`,
    },
    rightItem: {
      maxHeight: `100%`,
      maxHeight: `-moz-available`,
      maxHeight: `-webkit-fill-available`,
      maxHeight: `fill-available`,
    },
    leftContainer: {
      padding: `0 1rem 0 0`,
      margin: `0 0 0 0`,
      height: `100%`,
    },
    rightContainer: {
      padding: `0 0 0 1rem`,
      margin: `0 0 0 0`,
      height: `100%`,
      maxHeight: `inherit`,
    },
    rightSubitem: {
      maxHeight: `inherit`,
    },
    leftPaper: {
      height: `100%`,
      padding: `2rem 4rem 4rem 4rem`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: 'center',
    },
    rightPaper: {
      height: `100%`,
      width: `100%`,
      overflow: 'hidden',
    },
    questionFont: {
      fontWeight: `600`,
      color: isDark ? theme.palette.text.primary : grey[700],
    }
  }
});

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
      position: absolute;
      padding: 0 0 0 0;
      margin: 0 0 0 0;
      height: calc(100% - 10rem);
      top: 5.5rem;
      background-color: ${({theme}) => theme.palette.type === 'dark' ? `#333` : `#f4f6f8`};
  }
`;

const Faceoff = ({ question, nominees }) => {
    const classes = useStyles();
    const theme = useTheme();

    if (question && ['display', 'open'].includes(question.state)) {
        return (
            <StyledDialog
                theme={theme}
                open={true}
                fullWidth={true}
                maxWidth={`lg`}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >

              <AppBar className={classes.appBar} >
                <Toolbar>
                  <Typography variant="h6" className={`${classes.category} ${classes.appBarTitles}`}>
                    Category: { question.categoryName }
                  </Typography>
                  <Typography variant="h6" className={`${classes.points} ${classes.appBarTitles}`}>
                    Points: { question.points }
                  </Typography>
                </Toolbar>
              </AppBar>

              <DialogContent className={classes.dialogContent} >
                <Grid container
                  direction="row"
                  className={classes.contentContainer} >

                  <Grid item md={8} lg={8} xl={8}>
                    <Grid container className={classes.leftContainer} >
                      <Grid item md={12} lg={12} xl={12} >
                        <Paper className={classes.leftPaper} elevation={4} >
                          <Typography variant="h3" className={classes.questionFont} >
                              { question.question }
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={4} lg={4} xl={4} className={classes.rightItem} >
                    <Grid container className={classes.rightContainer}>
                      <Grid item md={12} lg={12} xl={12} className={classes.rightSubitem} >
                        <Paper className={classes.rightPaper} elevation={4} >
                          <Leaderboard header={`Contestants`} people={nominees} />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </DialogContent>

            </StyledDialog>
        );
    } else {
        return <div/>;
    }
}

export default Faceoff;
