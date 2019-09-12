import gql from "graphql-tag"

export const addContestantScore = gql`
    mutation AddContestantScore($gameId: Int!, $increment: Int!, $login: String!) {
      addContestantScore(gameId: $gameId, increment: $increment, login: $login) {
        gameId
        login
        name
        organization
        score
      }
    }
`;
export const joinGame = gql`
  mutation JoinGame($gameId: Int!) {
    joinGame(gameId: $gameId) {
      gameId
      login
      name
      organization
      score
    }
  }
`;
export const nominateContestant = gql`
  mutation NominateContestant(
    $login: String!
    $name: String!
    $organization: String!
    $quesId: Int!
  ) {
    nominateContestant(
      login: $login
      name: $name
      organization: $organization
      quesId: $quesId
    ) {
      login
      name
      organization
      quesId
      timebuzzed
    }
  }
`;
export const removeNominee = gql`
  mutation RemoveNominee($login: String!, $quesId: Int!) {
    removeNominee(login: $login, quesId: $quesId) {
      login
      name
      organization
      quesId
      timebuzzed
    }
  }
`;
export const setQuestionState = gql`
  mutation SetQuestionState($catgId: Int!, $quesId: Int!, $state: StateEnum!) {
    setQuestionState(catgId: $catgId, quesId: $quesId, state: $state) {
      answer
      catgId
      points
      quesId
      question
      state
    }
  }
`;
