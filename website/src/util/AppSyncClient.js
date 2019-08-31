import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";

const ALL_GAMES_GQL = gql(`
    query Query {
        listGames {
            gameId
            emcee
            title
        }
    }
`);

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
                    points
                    question
                    answer
                    state
                }
            }
        }
    }
`);

const UPDATE_QUES_STATE_GQL = gql(`
    mutation mod($catgId: Int!, $quesId: Int!, $newState: StateEnum!) {
        setQuestionState(catgId: $catgId, quesId: $quesId, state: $newState) {
            quesId
        }
    }
`);

const bus = new MessageBus();

class AppSyncClient {

    invoke = (gql, args, expectedReturnDataAttribute, callback) => {
        API.graphql(graphqlOperation(gql, args))
            .then(response => {
                console.log(response.data);
                const domainObj = response.data[expectedReturnDataAttribute];
                callback(domainObj);
            })
            .catch(err => bus.flashMessage(err));
    }

    allGames = (callback) => this.invoke(ALL_GAMES_GQL, {}, 'listGames', callback)

    getGameById = (gameId, callback) =>
        this.invoke(GET_GAME_GQL, { id: gameId }, 'getGameById', callback)

    updateQuestionState = (question, newState, callback) => {
        const args = { catgId: question.catgId, quesId: question.quesId, newState: newState };
        this.invoke(UPDATE_QUES_STATE_GQL, args, 'setQuestionState', callback);
    }
}

export default new AppSyncClient();
