import gql from "graphql-tag"

export const ALL_GAMES_GQL = gql`
    query Query {
        listGames {
            gameId
            emcee
            title
        }
    }
`;

export const GET_GAME_BY_ID_GQL = gql`
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

export const GET_QUES_GQL = gql`
    query Query($quesId: Int!) {
        getQuestionByQuesId(quesId: $quesId) {
            catgId
            quesId
            points
            question
            answer
            state
        }
    }
`;

export const UPDATE_QUES_STATE_GQL = gql`
    mutation mod($catgId: Int!, $quesId: Int!, $state: StateEnum!) {
        setQuestionState(catgId: $catgId, quesId: $quesId, state: $state) {
            catgId
            quesId
            points
            question
            answer
            state
        }
    }
`;

export const SUB_QUES_UPDATES_GQL = gql`
    subscription Subscription {
        questionStateChange {
            quesId
            state
        }
    }
`;

export const JOIN_GAME_GQL = gql`
    mutation mod($gameId: Int!) {
        joinGame(gameId: $gameId) {
            gameId
        }
    }
`;

export const NOMINATE_CONTESTANT_GQL = gql`
    mutation mod($quesId: Int!, $login: String!) {
        nominateContestant(quesId: $quesId, login: $login) {
            login
        }
    }
`;

export const SUB_NOMINATE_CONTESTANT_GQL = gql`
    subscription sub {
        nominateContestant {
            quesId
            login
            name
            organization
            timebuzzed
        }
    }
`;

export const REMOVE_NOMINEE_GQL = gql`
    mutation mod($quesId: Int!, $login: String!) {
        removeNominee(quesId: $quesId, login: $login) {
            quesId
            login
        }
    }
`;

export const SUB_REMOVE_NOMINEE_GQL = gql`
    subscription sub {
        removeNominee {
            quesId
            login
        }
    }
`;

export const SET_CONTESTANT_SCORE_GQL = gql`
    mutation mod($gameId: Int!, $login: String!, $newScore: Int) {
        setContestantScore(gameId: $gameId, login: $login, newScore: $newScore) {
            score
        }
    }
`;

export const SUB_SET_CONTESTANT_SCORE_GQL = gql`
    subscription sub($gameId: Int!) {
        setContestantScore(gameId: $gameId) {
            login
            name
            organization
            score
        }
    }
`;
