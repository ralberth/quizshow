import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";

const ALL_GAMES_GQL = gql`
    query Query {
        listGames {
            gameId
            emcee
            title
        }
    }
`;

const GET_GAME_GQL = gql`
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
`;

const GET_QUES_GQL = gql`
    query Query($quesId: Int!) {
        getQuestionByQuesId(quesId: $quesId) {
            state
        }
    }
`;

const UPDATE_QUES_STATE_GQL = gql`
    mutation mod($catgId: Int!, $quesId: Int!, $newState: StateEnum!) {
        setQuestionState(catgId: $catgId, quesId: $quesId, state: $newState) {
            quesId
        }
    }
`;

const SUB_QUES_UPDATES_GQL = gql`
    subscription Subscription {
        questionStateChange {
            quesId
            question
            state
        }
    }
`;

const bus = new MessageBus();

class AppSyncClient {

    invoke = (gql, args, expectedReturnDataAttribute, callback) => {
        API.graphql(graphqlOperation(gql, args))
            .then(response => {
                const domainObj = response.data[expectedReturnDataAttribute];
                callback(domainObj);
            })
            .catch(err => bus.flashMessage(err));
    }

    subscribe = (gql, args, expectedReturnDataAttribute, callback) =>
        API.graphql(graphqlOperation(SUB_QUES_UPDATES_GQL, args))
            .subscribe({
                next: (notification) => {
                    const domainObj = notification.value.data[expectedReturnDataAttribute];
                    callback(domainObj);
                },
                error: err => bus.flashMessage(err)
            })

    allGames = (callback) => this.invoke(ALL_GAMES_GQL, {}, 'listGames', callback)

    getGameById = (gameId, callback) =>
        this.invoke(GET_GAME_GQL, { id: gameId }, 'getGameById', callback)

    updateQuestionState = (question, newState, callback) => {
        const args = { catgId: question.catgId, quesId: question.quesId, newState: newState };
        this.invoke(UPDATE_QUES_STATE_GQL, args, 'setQuestionState', callback);
    }

    getQuestionByQuesId = (quesId, callback) =>
        this.invoke(GET_QUES_GQL, { quesId: quesId }, 'getQuestionByQuesId', callback);

    subQuestionStateChange = (callback) =>
        this.subscribe(SUB_QUES_UPDATES_GQL, {}, 'questionStateChange', callback);
}

export default new AppSyncClient();
