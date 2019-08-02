import React from 'react';
import Grid from '@material-ui/core/Grid';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import HomepageCard from './HomepageCard';
import './homepage.scss';

class Homepage extends React.Component {

    constructor(props) {
      super();
      this.props = props;
    }

    state = {
        joinCode: "",
        hostCode: ""
    }

    // setJoinCode = (event) => {
    //     this.setState({ joinCode: event.target.value });
    // }

    // setHostCode = (event) => {
    //     this.setState({ hostCode: event.target.value });
    // }

    // createGame = () => {
    //     // this.preventDefault();
    //     this.props.history.push('/createquiz');
    // }

    // playGame = () => { console.log(" play game " + this.state.joinCode); }
    // hostGame = () => { this.props.history.push('/hostgame'); }

    // tiers = [
    //     {
    //         title: 'Create',
    //         description: "Create a new Game Show with your own questions and answers.",
    //         buttonText: 'Create a Show',
    //         onClick: this.createGame
    //     },
    //     {
    //         title: 'Join',
    //         description: (
    //           <div>
    //             <p>Join a Game Show with a code from your emcee.</p>
    //             <TextField
    //               label="quiz code"
    //               margin="normal"
    //               variant="outlined"
    //               InputProps={{
    //                 startAdornment: <InputAdornment position="start">QC-</InputAdornment>,
    //               }}
    //               onChange={this.setJoinCode}/>
    //           </div>),
    //         buttonText: 'Play!',
    //         onClick: this.playGame
    //     },
    //     {
    //         title: 'Host',
    //         description: (
    //           <div>
    //             <p>Show the game board on a big screen for all players.</p>
    //             <TextField
    //                 label="quiz code"
    //                 margin="normal"
    //                 variant="outlined"
    //                 InputProps={{
    //                   startAdornment: <InputAdornment position="start">QC-</InputAdornment>,
    //                 }}
    //                 onChange={this.setHostCode}
    //             />
    //           </div>),
    //         buttonText: 'Show me',
    //         onClick: this.hostGame
    //     },
    // ];

    render() {
        return (
            <div className="homepage">
                <div className="hero">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Quiz Show
                    </Typography>
                    <p style={{ textAlign: 'center' }}>
                      Lorem Ipsum dolor sic amet
                    </p>
                </div>

                <Grid container spacing={4}>
                <HomepageCard
                        title="Create"
                        description="Create a new Game Show with your own questions and answers."
                        showInputField={false}
                        buttonText="Create"
                        urlbase="/creategame"
                    />
                    <HomepageCard
                        title="Join"
                        description="Join a Game Show with a code from your emcee."
                        showInputField={true}
                        buttonText="Join"
                        urlbase="/joingame"
                    />
                    <HomepageCard
                        title="Host"
                        description="Show the game board on a big screen for all players."
                        showInputField={true}
                        buttonText="Host"
                        urlbase="/hostgame"
                    />
                </Grid>
            </div>
        );
    }
}

export default Homepage;
