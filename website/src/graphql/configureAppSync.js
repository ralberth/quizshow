import Amplify, { Auth } from "aws-amplify"
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import * as localForage from "localforage";
import awsconfig from "../config/config";

// eslint-disable-next-line no-undef
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
  },
  offlineConfig: {
    storage: localForage
  }
});

export { configureAmplify, appSyncConnection };
