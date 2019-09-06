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

const JOIN_GAME_GQL = gql`
    mutation mod($gameId: Int!) {
        joinGame(gameId: $gameId) {
            gameId
        }
    }
`;

const NOMINATE_CONTESTANT_GQL = gql`
    mutation mod($quesId: Int!, $login: String!) {
        nominateContestant(quesId: $quesId, login: $login) {
            login
        }
    }
`;

const SUB_NOMINATE_CONTESTANT_GQL = gql`
    subscription sub($quesId: Int!) {
        nominateContestant(quesId: $quesId) {
            quesId
            login
            timebuzzed
        }
    }
`;

const REMOVE_NOMINEE_GQL = gql`
    mutation mod($quesId: Int!, $login: String!) {
        removeNominee(quesId: $quesId, login: $login) {
            quesId
        }
    }
`;

const SUB_REMOVE_NOMINEE_GQL = gql`
    subscription sub($quesId: Int!) {
        removeNominee(quesId: $quesId) {
            quesId
            login
            timebuzzed
        }
    }
`;

const SET_CONTESTANT_SCORE_GQL = gql`
    mutation mod($gameId: Int!, $login: String!, $newScore: Int) {
        setContestantScore(gameId: $gameId, login: $login, newScore: $newScore) {
            score
        }
    }
`;

const SUB_SET_CONTESTANT_SCORE_GQL = gql`
    subscription sub($gameId: Int!) {
        setContestantScore(gameId: $gameId) {
            login
            name
            organization
            score
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

    joinGame = (gameId, callback) =>
        this.invoke(JOIN_GAME_GQL, { gameId: gameId }, 'joinGame', callback);

    nominateContestant = (quesId, login, callback) =>
        this.invoke(NOMINATE_CONTESTANT_GQL, { quesId: quesId, login: login }, 'nominateContestant', callback);

    subNominateContestant = (quesId, callback) =>
        this.subscribe(SUB_NOMINATE_CONTESTANT_GQL, { quesId: quesId }, 'nominateSelf', callback);

    removeNominee = (quesId, login, callback) =>
        this.invoke(REMOVE_NOMINEE_GQL, { quesId: quesId, login: login }, 'removeNominee', callback);

    subRemoveNominee = (quesId, callback) =>
        this.subscribe(SUB_REMOVE_NOMINEE_GQL, { quesId: quesId }, 'removeNominee', callback);

    setContestantScore = (gameId, login, newScore, callback) => {
        const args = { gameId: gameId, login: login, newScore: newScore };
        this.invoke(SET_CONTESTANT_SCORE_GQL, args, 'setContestantScore', callback);
    }

    subSetContestantScore = (gameId, callback) =>
        this.subscribe(SUB_SET_CONTESTANT_SCORE_GQL, { gameId: gameId }, 'setContestantScore', callback);
}

export default new AppSyncClient();
