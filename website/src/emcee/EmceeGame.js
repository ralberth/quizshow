import React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import GameBoard from "../gameboard/GameBoard";
import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});

const GET_GAME_GQL = gql(`
    query Query($id: Int!) {
        getGameById(gameId: $id) {
            title
            categories {
                catgId
                categoryName
            }
            questions {
                quesId
                catgId
                prize
                question
                answer
                state
            }
        }
    }
`);


class EmceeGame extends React.Component {

    constructor(props) {
        super();
        this.props = props;
        this.bus = new MessageBus();
    }

    state = {
        game: null
    };

    componentDidMount = () => {
        const { gameId } = this.props.match.params;
        let me = this;
        API.graphql(graphqlOperation(GET_GAME_GQL, { id: gameId }))
            .then(game => me.setState({ game: game.data.getGameById }))
            .catch(err => me.bus.flashMessage(err));
    }

    render() {
        if (!this.state.game) {
            return (<span>Loading...</span>);
        } else {
            <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
            return (
                <div>
                    <GameTitle
                        variant="h3"
                        align="center"
                    >
                        {this.state.game.title}
                    </GameTitle>
                    <GameBoard game={this.state.game} />
                </div>
            );
        }
    }
}

export default EmceeGame;