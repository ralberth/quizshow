import Amplify from "@aws-amplify/core"
import Auth from "@aws-amplify/auth"
import API from "@aws-amplify/api"

const amplifyConfig = {
  aws_appsync_region: "us-east-1",
  aws_appsync_graphqlEndpoint: "https://gv7jv76umvb5tddzk7zuxb6spe.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_RNv6rD9se",
    userPoolWebClientId: "7pe0fnglfsp17ofh3mo2u3eskk",
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
  API.configure(amplifyConfig)
  Auth.configure(amplifyConfig)
}
