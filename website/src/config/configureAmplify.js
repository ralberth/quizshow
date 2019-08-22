import Amplify from "@aws-amplify/core"

require('@aws-amplify/pubsub')  // MUST be here or pubsub doesn't work.

const amplifyConfig = {
  aws_appsync_region: "us-east-1",
  aws_appsync_graphqlEndpoint: "https://zkz2frlivbb2haqlzgqprnsp7i.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_5JLHA6uD8",
    userPoolWebClientId: "56cp70k3trmfcdlag07nvodthq",
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
}

export default () => {
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        "EH-Version": "1.0",
      }),
    },
  })
  Amplify.configure(amplifyConfig)
}
