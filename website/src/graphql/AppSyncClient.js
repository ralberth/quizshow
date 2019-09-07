import MessageBus from "../common/MessageBus";
import { appSyncConnection } from "./configureAppSync";
import {
    SUB_QUES_UPDATES_GQL, ALL_GAMES_GQL, GET_GAME_BY_ID_GQL, UPDATE_QUES_STATE_GQL,
    GET_QUES_GQL, JOIN_GAME_GQL, NOMINATE_CONTESTANT_GQL,
    SUB_NOMINATE_CONTESTANT_GQL, REMOVE_NOMINEE_GQL, SUB_REMOVE_NOMINEE_GQL,
    SET_CONTESTANT_SCORE_GQL, SUB_SET_CONTESTANT_SCORE_GQL
} from './graphqlQueries';
import { print as gqlToString } from 'graphql/language';

const bus = new MessageBus();

const getObjFromResponse = ({ data }) => {
    if (!data)
        throw "No data found";                                   // eslint-disable-line no-throw-literal

    const keys = Object.keys(data);
    if (keys.length === 1 && data[keys[0]] !== null)
        return data[keys[0]];

    if (data[keys[0]] === null)
        throw 'AppSync query could not resolve variables!';      // eslint-disable-line no-throw-literal

    throw 'AppSync query returned more than one object!';        // eslint-disable-line no-throw-literal
}

const oneLineQueryStr = (gql) => gqlToString(gql).replace(/\n/g, " ").replace(/  +/g, " ");

class AppSyncClient {

    raiseErrorViaToast = (gql, args, errObj) => {
        console.error("AppSync Error:");
        console.error("AppSync query", gqlToString(gql));
        console.error("AppSync Variables", args);
        bus.flashMessage(errObj);
    }

    query = async (gql, args, callback=null) => {
        try {
            const result = await appSyncConnection.query({ query: gql, variables: args });
            const obj = getObjFromResponse(result);
            console.debug(`Query "${oneLineQueryStr(gql)}" return:`, obj);
            if (callback)
                return callback(obj);
            return obj;
        } catch(err) {
            this.raiseErrorViaToast(gql, args, err);
        }
    }

    mutate = async (gql, args, callback=null) => {
        try {
            const result = await appSyncConnection.mutate({ mutation: gql, variables: args });
            const obj = getObjFromResponse(result);
            console.debug(`Mutation "${oneLineQueryStr(gql)}" with vars ${args} completed`);
            if (callback)
                return callback(obj);
            return obj;
        } catch(err) {
            this.raiseErrorViaToast(gql, args, err);
        }
    }

    subscribe = (gql, args, callback) => {
        try {
            const query = oneLineQueryStr(gql);
            console.debug(`Subscribing to "${query}" with args ${args}`);
            const subs = appSyncConnection.subscribe({ query: gql, variables: args })
                .subscribe({
                    next: (notification) => {
                        const obj = getObjFromResponse(notification);
                        callback(obj);
                    },
                    error: err => this.raiseErrorViaToast(gql, args, err)
                });
            return {
                unsubscribe: () => {
                    console.debug(`Unsubscribed from "${query}"`);
                    subs.unsubscribe();
                }
            };
        } catch(err) {
            this.raiseErrorViaToast(gql, args, err);
        }
    }

    allGames = (callback) => this.query(ALL_GAMES_GQL, {}, callback)

    getGameById = (gameId, callback) =>
        this.query(GET_GAME_BY_ID_GQL, { id: gameId },  callback)

    updateQuestionState = (question, newState, callback) => {
        const args = { catgId: question.catgId, quesId: question.quesId, newState: newState };
        this.mutate(UPDATE_QUES_STATE_GQL, args,  callback);
    }

    getQuestionByQuesId = (quesId, callback) =>
        this.query(GET_QUES_GQL, { quesId: quesId },  callback);

    subQuestionStateChange = (callback) =>
        this.subscribe(SUB_QUES_UPDATES_GQL, {},  callback);

    joinGame = (gameId, callback) =>
        this.mutate(JOIN_GAME_GQL, { gameId: gameId },  callback);

    nominateContestant = (quesId, login, callback) =>
        this.mutate(NOMINATE_CONTESTANT_GQL, { quesId: quesId, login: login },  callback);

    subNominateContestant = (quesId, callback) =>
        this.subscribe(SUB_NOMINATE_CONTESTANT_GQL, { quesId: quesId },  callback);

    removeNominee = (quesId, login, callback) =>
        this.mutate(REMOVE_NOMINEE_GQL, { quesId: quesId, login: login },  callback);

    subRemoveNominee = (quesId, callback) =>
        this.subscribe(SUB_REMOVE_NOMINEE_GQL, { quesId: quesId },  callback);

    setContestantScore = (gameId, login, newScore, callback) => {
        const args = { gameId: gameId, login: login, newScore: newScore };
        this.mutate(SET_CONTESTANT_SCORE_GQL, args,  callback);
    }

    subSetContestantScore = (gameId, callback) =>
        this.subscribe(SUB_SET_CONTESTANT_SCORE_GQL, { gameId: gameId },  callback);
}

export default new AppSyncClient();
