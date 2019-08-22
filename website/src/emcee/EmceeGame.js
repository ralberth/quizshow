import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";
import HeroText from "../common/HeroText";

const useStyles = makeStyles(theme => ({
    heading: {
      fontSize: "medium",
      fontWeight: "bold"
    },
    button: {
        fontSize: "large"
    }
}));

const CategoryPanel = ({ category, children }) => {
    const classes = useStyles();
    return (
        <Card raised={true}>
            <CardHeader title={category} className={classes.heading} />
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

const QuesButton = ({ prize, onClick }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            className={classes.button}
            onClick={onClick}
        >
            ${prize}
        </Button>
    );
}

const GET_GAME_GQL = gql(`
    query Query($id: Int!) {
        getGameById(gameId: $id) {
            title
            categories {
                catgId
                categoryName
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
    }

    componentDidMount = () => {
        const { gameId } = this.props.match.params;
        let me = this;
        API.graphql(graphqlOperation(GET_GAME_GQL, { id: gameId }))
            .then(game => me.setState({ game: game.data.getGameById }))
            .catch(err => me.bus.flashMessage(err));
    }

    launchQuestion = (event) => {
        console.log("Question");
    }

    render() {
        if (!this.state.game) {
            return (<span>Loading...</span>);
        } else {
            return (
                <div>
                    <HeroText title={this.state.game.title} />
                    <Grid container justify="center" spacing={4}>
                        {this.state.game.categories.map(catg => (
                            <Grid item key={catg.catgId}>
                                <CategoryPanel
                                    category={catg.categoryName}
                                >
                                    <Grid container spacing={1}>
                                        {catg.questions.map(ques => (
                                            <Grid item key={ques.quesId}>
                                                <QuesButton
                                                    prize={ques.prize}
                                                    onClick={this.launchQuestion} />
                                            </Grid>))}
                                    </Grid>
                                </CategoryPanel>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );
        }
    }
}

export default EmceeGame;
