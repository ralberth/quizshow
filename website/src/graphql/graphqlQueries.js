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
            gameId
            title
            categories {
                catgId
                categoryName
                questions {
                    quesId
                    catgId
                    points
                    categoryName
                    question
                    answer
                    state
                }
            }
            contestants {
              gameId
              login
              name
              organization
              score
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
            categoryName
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
            categoryName
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
            login
            name
            organization
            score
        }
    }
`;

export const NOMINATE_SELF_GQL = gql`
    mutation mod($quesId: Int!) {
        nominateSelf(quesId: $quesId) {
            quesId
            login
            name
            organization
            timebuzzed
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

export const ADD_CONTESTANT_SCORE_GQL = gql`
    mutation mod($gameId: Int!, $login: String!, $increment: Int!) {
        addContestantScore(gameId: $gameId, login: $login, increment: $increment) {
            gameId
            login
            name
            organization
            score
        }
    }
`;

export const SUB_ADD_CONTESTANT_SCORE_GQL = gql`
    subscription sub {
        addContestantScore {
            gameId
            login
            name
            organization
            score
        }
    }
`;
