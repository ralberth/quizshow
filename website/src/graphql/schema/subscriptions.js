import gql from "graphql-tag"

export const contestantHasJoinedTheGame = gql`
  subscription ContestantHasJoinedTheGame {
    contestantHasJoinedTheGame {
      gameId
      login
      name
      organization
      score
    }
  }
`;

export const contestantHasLeftTheGame = gql`
  subscription ContestantHasLeftTheGame {
    contestantHasLeftTheGame {
      gameId
      login
      name
      organization
      score
    }
  }
`;

export const addContestantScore = gql`
  subscription AddContestantScore {
    addContestantScore {
      gameId
      login
      name
      organization
      score
    }
  }
`;
export const nominateContestant = gql`
  subscription NominateContestant {
    nominateContestant {
      login
      name
      organization
      quesId
      timebuzzed
    }
  }
`;
export const questionStateChange = gql`
  subscription QuestionStateChange {
    questionStateChange {
      answer
      catgId
      points
      quesId
      categoryName
      question
      state
    }
  }
`;
export const removeNominee = gql`
  subscription RemoveNominee {
    removeNominee {
      login
      name
      organization
      quesId
      timebuzzed
    }
  }
`;
