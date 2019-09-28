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
        game: null,
        question: null,
        buzzerDisabled: true,
        buttonText: 'waiting',
        contestants: [],
        leaderboard: false,
    }

    handleQuestionStateChange = (ques) => {
        console.debug("Question change: ", ques);
        if (ques.state === "ready")
          this.setState({ question: null, buzzerDisabled: true, buttonText: 'waiting', leaderboard: false });
        if (ques.state === "closed")
          this.setState({ question: null, buzzerDisabled: true, buttonText: 'waiting', leaderboard: true });
        if (ques.state === "display")
          this.setState({ question: ques, buzzerDisabled: true, buttonText: 'waiting' });
        if (ques.state === "open")
          this.setState({ buzzerDisabled: false, buttonText: 'Buzz' });
    }

    handleContestantHasJoinedTheGame = newContestant => {
      this.setState({ contestants: Array.from(new Set([...this.state.contestants, newContestant])) });
    }

    componentDidMount = () => {
        appSyncClient.joinGame(this.gameId, () => {});
        appSyncClient.getGameById(this.gameId, game => this.setState({ game: game, contestants: game.contestants }));
        this.quesSub = appSyncClient.subQuestionStateChange(this.handleQuestionStateChange);
        this.contestantSub = appSyncClient.subPlayerHasJoinedTheGame(this.handleContestantHasJoinedTheGame);
    }

    componentWillUnmount = () => {
        this.quesSub.unsubscribe();
        this.contestantSub.unsubscribe();
    }

    handleBuzzButton = () => {
        appSyncClient.nominateSelf(this.state.question.quesId, () => {});
        this.setState({ buzzerDisabled: true, buttonText: 'Buzzed' });
    }

    render() {
      console.log('question:', this.state.question);

      if (!this.state.game)
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
                question={this.state.question}
                buzzerDisabled={this.state.buzzerDisabled}
                buttonText={this.state.buttonText}
                onBuzz={this.handleBuzzButton}
              />
          </Grid>
      );
    }
}

export default PlayGame;
