import Amplify, { Auth } from "aws-amplify"
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from "../config/config";

require('@aws-amplify/pubsub')  // MUST be here or pubsub doesn't work.


const configureAmplify = () => {
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        "EH-Version": "1.0",
      }),
    },
  })
  Amplify.configure(awsconfig);
}

const appSyncConnection = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

export { configureAmplify, appSyncConnection };
