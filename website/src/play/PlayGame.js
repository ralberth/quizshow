import React from 'react';
import Grid from '@material-ui/core/Grid';
import Leaderboard from '../common/Leaderboard';
import Loading from '../common/Loading';
import PlayerCurrentGame from './PlayerCurrentGame';
import ContestantQuestion from './ContestantQuestion';
import appSyncClient from '../graphql/AppSyncClient';

class PlayGame extends React.Component {

    constructor(props) {
        super(props);
        this.gameId = parseInt(props.match.params.gameId, 10);
    }

    state = {
        me: null, // contestant record
        game: null,
        question: null,
        buzzerDisabled: true
    }

    handleQuestionStateChange = (ques) => {
        console.debug("Question change: ", ques);
        if (ques.state === "ready" || ques.state === "closed")
          this.setState({ question: null, buzzerDisabled: true });
        if (ques.state === "display")
          this.setState({ question: ques, buzzerDisabled: true });
        if (ques.state === "open")
          this.setState({ buzzerDisabled: false });
    }

    componentDidMount = () => {
        appSyncClient.joinGame(this.gameId, me => this.setState({ me: me }));
        appSyncClient.getGameById(this.gameId, game => this.setState({ game: game }));
        this.quesSub = appSyncClient.subQuestionStateChange(this.handleQuestionStateChange);
    }

    componentWillUnmount = () => {
        this.quesSub.unsubscribe();
    }

    handleBuzzButton = () => {
        appSyncClient.nominateContestant(
            this.state.question.quesId,
            this.state.me.login,
            this.state.me.name,
            this.state.me.organization,
            () => {});
        this.setState({ buzzerDisabled: true });
    }

    render() {
      if (!this.state.game || !this.state.me)
          return <Loading />;

      if (!this.state.question)
          return (
              <Grid container direction="column" justify="center" alignItems="center" >
                  <PlayerCurrentGame title={this.state.game.title} />
                  {/* <Leaderboard people={people}
                  /> */}
              </Grid>
          );

      return (
          <Grid container>
              <ContestantQuestion
                question={this.state.question.question}
                buzzerDisabled={this.state.buzzerDisabled}
                onBuzz={this.handleBuzzButton}
              />
          </Grid>
      );
    }
}

export default PlayGame;
