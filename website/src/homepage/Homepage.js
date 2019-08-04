import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HomepageCard from './HomepageCard';
import './homepage.scss';

class Homepage extends React.Component {

    constructor(props) {
      super();
      this.props = props;
    }

    doCreate = () => this.props.history.push("/creategame");
    doAdmin  = () => this.props.history.push("/gameadmin");
    doJoin   = () => this.props.history.push("/joingame");
    doHost   = () => this.props.history.push("/hostgame");

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
                        description="Create a new Quiz Show and let people connect to play."
                        buttonText="Create"
                        onClick={this.doCreate}
                    />
                    <HomepageCard
                        title="Admin"
                        description="Reconnect, manage, and close Quiz Shows that you emcee."
                        buttonText="Admin"
                        onClick={this.doAdmin}
                    />
                    <HomepageCard
                        title="Join"
                        description="Join a Game Show with a code from your emcee."
                        buttonText="Join"
                        onClick={this.doJoin}
                    />
                    <HomepageCard
                        title="Host"
                        description="Show the game board on a big screen for all players."
                        buttonText="Host"
                        onClick={this.doHost}
                    />
                </Grid>
            </div>
        );
    }
}

export default Homepage;
