import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";

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

const AppSyncClient = {
    getGameById: (gameId, callback) => {
        API.graphql(graphqlOperation(GET_GAME_GQL, { id: gameId }))
            .then(response => callback(response.data.getGameById))
            .catch(err => bus.flashMessage(err));
    },

    updateQuestionState: (question, newState, callback) => {
        const args = { catgId: question.catgId, quesId: question.quesId, newState: newState };
        API.graphql(graphqlOperation(UPDATE_QUES_STATE_GQL, args))
            .then(response => callback())
            .catch(err => bus.flashMessage(err));
    }
};

export default AppSyncClient;
