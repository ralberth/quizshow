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

const type2KeyFields = new Map();
type2KeyFields['Game']       = [ 'gameId' ];
type2KeyFields['Category']   = [ 'catgId' ];
type2KeyFields['Question']   = [ 'quesId' ];
type2KeyFields['Contestant'] = [ 'gameId', 'login' ];
type2KeyFields['Nominee']    = [ 'quesId', 'login' ];

const dataIdFromObject = (obj) => {
  const fields = type2KeyFields[obj.__typename];
  if (!fields)
    throw new Error("Object to dataIdFromObject doesn't have __typename attribute");

  const vals = fields.map(fieldName => {
    if (fieldName in obj) {
      const val = obj[fieldName];
      if (val)
        return val;
      else
        throw new Error(`dataIdFromObject: obj.${fieldName} was falsy`);
    } else
      throw new Error(`dataIdFromObject: obj doesn't have property ${fieldName}: ${JSON.stringify(obj, null, 2)}`);
  });

  const id = `${obj.__typename}:${vals.join(',')}`;
  console.log('dataIdFromObject:', id);
  return id;
}

const clearAppSyncLocalStore = () => localForage.clear();


const appSyncConnection = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  offlineConfig: {
    storage: localForage
  },
  cacheOptions: {
    dataIdFromObject: dataIdFromObject
  }
});

export { configureAmplify, appSyncConnection, clearAppSyncLocalStore };
