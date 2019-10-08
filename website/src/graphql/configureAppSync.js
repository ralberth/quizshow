import Amplify, { Auth } from "aws-amplify"
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from "../config/config.json";

// eslint-disable-next-line no-undef
require('@aws-amplify/pubsub')  // MUST be here or pubsub doesn't work.

const appsyncSettings = {
  aws_appsync_region: awsconfig.region,
  aws_appsync_graphqlEndpoint: awsconfig.graphql,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  Auth: {
    region: awsconfig.region,
    userPoolId: awsconfig.userPoolId,
    userPoolWebClientId: awsconfig.userPoolWebClientId,
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
};

const configureAmplify = () => {
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        "EH-Version": "1.0",
      }),
    },
  })
  Amplify.configure(appsyncSettings);
}

const type2KeyFields = new Map();
type2KeyFields['Game']       = [ 'gameId' ];
type2KeyFields['Category']   = [ 'catgId' ];
type2KeyFields['Question']   = [ 'quesId' ];
type2KeyFields['Contestant'] = [ 'gameId', 'login' ];
type2KeyFields['Nominee']    = [ 'quesId', 'login' ];

// const dataIdFromObject = (obj) => {
//   // console.log("dataIdFromObject", obj);
//   if (! obj.__typename)
//     throw new Error(`Object to dataIdFromObject doesn't have __typename attribute: ${JSON.stringify(obj, null, 3)}`);

//   const fields = type2KeyFields[obj.__typename];
//   if (!fields)
//     throw new Error("__typename of object passed to dataIdFromObject isn't in type2KeyFields");

//   const vals = fields.map(fieldName => {
//     if (fieldName in obj) {
//       const val = obj[fieldName];
//       if (val)
//         return val;
//       else
//         throw new Error(`dataIdFromObject: obj.${fieldName} was falsy`);
//     } else
//       throw new Error(`dataIdFromObject: obj doesn't have property ${fieldName}: ${JSON.stringify(obj, null, 2)}`);
//   });

//   const id = `${obj.__typename}:${vals.join(',')}`;
//   console.log('dataIdFromObject:', id);
//   return id;
// }


// Clears redux and other Amplify/AppSync stuff stored locally.   There were sync and stale
// data problems, so "log out and log back in" is now a true RESET that should sort out any
// problems with stale data.
const clearAppSyncLocalStore = () => localStorage.clear();


const appSyncConnection = new AWSAppSyncClient({
  url: awsconfig.graphql,
  region: awsconfig.region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  disableOffline: true
  // offlineConfig: {   // offline disabled for now
  //   storage: localForage
  // },
  // cacheOptions: {
  //   dataIdFromObject: dataIdFromObject
  // }
});

export { configureAmplify, appSyncConnection, clearAppSyncLocalStore };
