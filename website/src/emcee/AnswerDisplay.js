import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CancelAbortNextPanel from './CancelAbortNextPanel';
import CorrectWrongPanel from './CorrectWrongPanel';
import Leaderboard from '../common/Leaderboard';
import { SUB_NOMINATE_CONTESTANT_GQL } from '../graphql/graphqlQueries';
import { useAppSyncSubs } from "../graphql/useAppSyncHooks";
import appSyncClient from "../graphql/AppSyncClient";

const ANSWER_STYLE = {
    fontWeight: `bold`,
    margin: `6rem`,
    textAlign: `center`,
};

class AnswerDisplay extends React.Component {

  // quesId, answer, onCancel, onAbort

    state = {
      nominees: [] // kept sorted
    };

    handleSubscribedNominee = (nominee) => {
        console.debug("got new nominee: ", nominee);
        this.state.nominees.push(nominee);
        this.state.nominees.sort((a,b) => a.timebuzzed - b.timebuzzed);
        this.forceUpdate();
    }

    componentDidMount = () => {
        this.sub = appSyncClient.subNominateContestant(this.handleSubscribedNominee);
    }

    componentWillUnmount = () => {
      this.sub.unsubscribe();
    }

    render() {
        return (
            <Grid container direction="column" justify="flex-start" alignItems="center">

              <Grid item>
                <Typography style={ANSWER_STYLE} variant="h5" >
                  { `A: ${this.props.answer}` }
                </Typography>
              </Grid>

              <Grid item>
                  <CancelAbortNextPanel
                      onCancel={this.props.onCancel}
                      onAbort={this.props.onAbort} />
              </Grid>

              <Grid item>
                <CorrectWrongPanel/>
              </Grid>

              <Grid item>
                <Leaderboard people={this.state.nominees} />
              </Grid>
            </Grid>
        );
    }
}



// const AnswerDisplay = ({ quesId, answer, onCancel, onAbort }) => {
//     const classes = useStyles();
//     const [ nominees, setNominees ] = useState([]);

//     const newNominee = useAppSyncSubs(SUB_NOMINATE_CONTESTANT_GQL, { quesId: quesId });
//     if (newNominee) {
//       console.debug("got new nominee: ", newNominee);
//       nominees.push(newNominee);
//       setNominees(nominees);
//     }

//     return (
//       <Grid container direction="column" justify="flex-start" alignItems="center">

//         <Grid item className={classes.questionGrid}>
//           <Typography className={classes.answer} variant="h5" >
//             { `A: ${answer}` }
//           </Typography>
//         </Grid>

//         <Grid item className={classes.bottomGrid} >
//             <CancelAbortNextPanel
//                 onCancel={onCancel}
//                 onAbort={onAbort} />
//         </Grid>

//         <Grid item>
//           <CorrectWrongPanel/>
//         </Grid>

//         <Grid item>
//           <Leaderboard
//             people={nominees}
//             sortFcn={ (a, b) => a.timeBuzzed - b.timeBuzzed }
//           />
//         </Grid>
//       </Grid>
//     );
// }

export default AnswerDisplay;
