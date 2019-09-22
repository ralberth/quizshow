import gql from "graphql-tag"

export const getGameById = gql`
  query GetGameById($gameId: Int!) {
    getGameById(gameId: $gameId) {
      categories {
        categoryName
        catgId
        gameId
      }
      contestants {
        gameId
        login
        name
        organization
        score
      }
      emcee
      gameId
      title
    }
  }
`;
export const getQuestionByQuesId = gql`
  query GetQuestionByQuesId($quesId: Int!) {
    getQuestionByQuesId(quesId: $quesId) {
      answer
      catgId
      points
      quesId
      question
      state
    }
  }
`;
export const listContestants = gql`
  query ListContestants {
    listContestants {
      gameId
      login
      name
      organization
      score
    }
  }
`;
export const listGames = gql`
  query ListGames {
    listGames {
      categories {
        categoryName
        catgId
        gameId
      }
      contestants {
        gameId
        login
        name
        organization
        score
      }
      emcee
      gameId
      title
    }
  }
`;
export const listGamesByEmcee = gql`
  query ListGamesByEmcee($emcee: String!) {
    listGamesByEmcee(emcee: $emcee) {
      categories {
        categoryName
        catgId
        gameId
      }
      contestants {
        gameId
        login
        name
        organization
        score
      }
      emcee
      gameId
      title
    }
  }
`;
