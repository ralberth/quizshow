import Amplify from "@aws-amplify/core"
import amplifyConfig from "./config";

require('@aws-amplify/pubsub')  // MUST be here or pubsub doesn't work.



export default () => {
  Amplify.configure({
    API: {
      graphql_headers: async () => ({
        "EH-Version": "1.0",
      }),
    },
  })
  Amplify.configure(amplifyConfig);
}
