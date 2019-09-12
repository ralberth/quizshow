const https = require('https');
const AWS = require("aws-sdk");
const fs = require('fs');
const csv = require('csv-parse/lib/sync');
const urlParse = require("url").URL;
const file = fs.readFileSync('contestants.csv');
const appsyncUrl = process.env.REACT_APP_QUIZSHOW_GRAPHQL_ENDPOINT;
const region = process.env.REACT_APP_QUIZSHOW_REGION;
const apiKey = process.env.REACT_APP_QUIZSHOW_APIKEY;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const GAME_ID = process.argv[2];
const records = csv(file, { columns: true });

const JOIN_GAME = `
  mutation JoinGame(
    $gameId: Int!
    $login: String!
    $name: String!
    $organization: String!
  ) {
    joinGame(
      gameId: $gameId
      login: $login
      name: $name
      organization: $organization
  ) {
      gameId
      login
      name
      organization
      score
    }
  }
`;

const callAppSync = (query, args, opName, callback) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.headers["x-api-key"] = apiKey;
    req.body = JSON.stringify({
        query: query,
        operationName: opName,
        variables: args
    });

    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
        result.on('data', (body) => {
            const bodyObj = JSON.parse(body.toString());
            callback(bodyObj.data[opName]);
        });
    });
    httpRequest.write(req.body);
    httpRequest.end();
};

const numToNominate = Math.floor(Math.random() * (70 - 1 + 1) + 1)
console.log('Num Contestants:', numToNominate)
for(var count = 0; count < numToNominate; count++) {
    const i = Math.floor(Math.random() * records.length);
    const person = records.splice(i, 1)[0]; // remove 1 element at index i
    const args = {
        gameId: GAME_ID,
        login: person.login,
        name: person.name,
        organization: person.organization,
    };
    try {
      callAppSync(JOIN_GAME, args, 'JoinGame', () => { });
    } catch(e) {
      console.log('error:', JSON.stringify(e));
      console.log('\nperson:', JSON.stringify(person));
      console.log('\nargs:', JSON.stringify(args));
    }
}
