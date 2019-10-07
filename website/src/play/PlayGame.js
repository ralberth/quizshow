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
      const alreadyThere = this.state.contestants.find(c => c.login === newContestant.login);
      if (!alreadyThere)
        this.setState({ contestants: Array.from(new Set([...this.state.contestants, newContestant])) });
    }

    componentDidMount = () => {
        appSyncClient.joinGame(this.gameId, () => {
          // Don't get the game until you join, or you won't be in the contestant list
          appSyncClient.getGameById(this.gameId, game => {
            this.setState({ game: game, contestants: game.contestants });
            this.contestantSub = appSyncClient.subPlayerHasJoinedTheGame(this.handleContestantHasJoinedTheGame);
          });
        });
        this.quesSub = appSyncClient.subQuestionStateChange(this.handleQuestionStateChange);
        this.addScoreSub = appSyncClient.subAddContestantScore(contestant => {
          this.state.contestants.forEach(c => {
            if (c.login === contestant.login)
              c.score = contestant.score;
          })
          this.forceUpdate();
        });
    }

    componentWillUnmount = () => {
        this.quesSub.unsubscribe();
        this.contestantSub.unsubscribe();
        this.addScoreSub.unsubscribe();
    }

    handleBuzzButton = () => {
        appSyncClient.nominateSelf(this.state.question.quesId, () => {});
        this.setState({ buzzerDisabled: true, buttonText: 'Buzzed' });
    }

    render() {

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
