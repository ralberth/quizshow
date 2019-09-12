import React from 'react';
import Grid from '@material-ui/core/Grid';
import Leaderboard from '../common/Leaderboard';
import Loading from '../common/Loading';
import PlayerCurrentGame from './PlayerCurrentGame';
import ContestantQuestion from './ContestantQuestion';
import appSyncClient from '../graphql/AppSyncClient';
import Auth from "@aws-amplify/auth"

class PlayGame extends React.Component {

    constructor(props) {
        super(props);
        this.gameId = parseInt(props.match.params.gameId, 10);
    }

    state = {
        me: null, // contestant record
        game: null,
        question: null,
        buzzerDisabled: true,
        contestants: [],
        leaderboard: false,
    }

    handleQuestionStateChange = (ques) => {
        console.debug("Question change: ", ques);
        if (ques.state === "ready")
          this.setState({ question: null, buzzerDisabled: true, leaderboard: false });
        if (ques.state === "closed")
          this.setState({ question: null, buzzerDisabled: true, leaderboard: true });
        if (ques.state === "display")
          this.setState({ question: ques, buzzerDisabled: true });
        if (ques.state === "open")
          this.setState({ buzzerDisabled: false });
    }

    handleContestantHasJoinedTheGame = newContestant => {
      this.setState({ contestants: Array.from(new Set([...this.state.contestants, newContestant])) });
    }

    componentDidMount = async () => {
        const user = await Auth.currentAuthenticatedUser();

        this.setState({ me: {
            login: user.username,
            name: user.attributes.nickname,
            organization: user.attributes['custom:organization']
          }});

        appSyncClient.joinGame(
          this.gameId,
          this.state.me.login,
          this.state.me.name,
          this.state.me.organization,
          () => {}
        );

        appSyncClient.getGameById(this.gameId, game => this.setState({ game: game, contestants: game.contestants }));
        this.quesSub = appSyncClient.subQuestionStateChange(this.handleQuestionStateChange);
        this.contestantSub = appSyncClient.subPlayerHasJoinedTheGame(this.handleContestantHasJoinedTheGame);
    }

    componentWillUnmount = () => {
        this.quesSub.unsubscribe();
        this.contestantSub.unsubscribe();
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
                  <Leaderboard
                        header={this.state.leaderboard ? `Leaderboard` : `Contestants`}
                        people={this.state.contestants} />
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
