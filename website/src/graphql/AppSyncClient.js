import MessageBus from "../common/MessageBus";
import { appSyncConnection } from "./configureAppSync";
import {
    SUB_QUES_UPDATES_GQL, ALL_GAMES_GQL, GET_GAME_BY_ID_GQL, UPDATE_QUES_STATE_GQL,
    GET_QUES_GQL, JOIN_GAME_GQL, NOMINATE_SELF_GQL,
    SUB_NOMINATE_CONTESTANT_GQL, REMOVE_NOMINEE_GQL, SUB_REMOVE_NOMINEE_GQL,
    ADD_CONTESTANT_SCORE_GQL, SUB_ADD_CONTESTANT_SCORE_GQL
} from './graphqlQueries';
import {
  contestantHasJoinedTheGame,
  // contestantHasLeftTheGame
} from '../graphql/schema/subscriptions';
import { print as gqlToString } from 'graphql/language';

const bus = new MessageBus();

const getObjFromResponse = ({ data }) => {
    if (!data)
        throw new Error("No data found");

    const keys = Object.keys(data);
    if (keys.length === 1 && data[keys[0]] !== null)
        return data[keys[0]];

    if (data[keys[0]] === null)
        throw new Error('AppSync query could not resolve variables!');

    throw new Error('AppSync query returned more than one object!');
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
            console.debug(`Mutation "${oneLineQueryStr(gql)}" with vars ${JSON.stringify(args)} completed`);
            if (callback)
                return callback(obj);
            return obj;
        } catch(err) {
            this.raiseErrorViaToast(gql, args, err);
        }
    }

    subscribe = (gql, args={}, callback) => {
        try {
            const query = oneLineQueryStr(gql);
            console.debug(`Subscribing to "${query}" with args ${JSON.stringify(args)}`);
            const subs = appSyncConnection.subscribe({ query: gql, variables: args })
                .subscribe({
                    next: (notification) => {
                        const obj = getObjFromResponse(notification);
                        callback(obj);
                    },
                    error: err => {
                      console.error(`from inside subscribe`, err);
                      this.raiseErrorViaToast(gql, args, err)
                    }
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
        const args = { catgId: question.catgId, quesId: question.quesId, state: newState };
        this.mutate(UPDATE_QUES_STATE_GQL, args,  callback);
    }

    getQuestionByQuesId = (quesId, callback) =>
        this.query(GET_QUES_GQL, { quesId: quesId },  callback);

    subQuestionStateChange = (callback) =>
        this.subscribe(SUB_QUES_UPDATES_GQL, {},  callback);

    joinGame = (gameId, callback) => {
      const args = { gameId: gameId };
      this.mutate(JOIN_GAME_GQL, args,  callback);
    }

    subPlayerHasJoinedTheGame = (callback) =>
        this.subscribe(contestantHasJoinedTheGame, {}, callback)

    nominateSelf = (quesId, callback) => {
        const args = { quesId: quesId };
        this.mutate(NOMINATE_SELF_GQL, args,  callback);
    }

    subNominateContestant = (callback) =>
        this.subscribe(SUB_NOMINATE_CONTESTANT_GQL, {}, callback);

    removeNominee = (quesId, login, callback) =>
        this.mutate(REMOVE_NOMINEE_GQL, { quesId: quesId, login: login },  callback);

    subRemoveNominee = (callback) =>
        this.subscribe(SUB_REMOVE_NOMINEE_GQL, {},  callback);

    addContestantScore = (gameId, login, increment, callback) => {
        const args = { gameId: gameId, login: login, increment: increment };
        this.mutate(ADD_CONTESTANT_SCORE_GQL, args,  callback);
    }

    subAddContestantScore = (gameId, callback) =>
        this.subscribe(SUB_ADD_CONTESTANT_SCORE_GQL, { gameId: gameId },  callback);
}

export default new AppSyncClient();
