import gql from "graphql-tag"

export const getGameByIdGQL = gql`
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

export const subQuestionStateChangeGQL = gql`
    subscription Subscription {
        questionStateChange {
            quesId
            state
        }
    }
`;
