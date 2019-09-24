const https = require('https');
const AWS = require("aws-sdk");
const fs = require('fs');
const csv = require('csv-parse/lib/sync');
const urlParse = require("url").URL;
const appsyncUrl = process.env.REACT_APP_QUIZSHOW_GRAPHQL_ENDPOINT;
const region = process.env.REACT_APP_QUIZSHOW_REGION;
const apiKey = process.env.REACT_APP_QUIZSHOW_APIKEY || process.env.QUIZSHOW_APIKEY;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

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
            console.log(bodyObj);
        });
    });
    httpRequest.write(req.body);
    httpRequest.end();
};

exports.addContestants = (datafile, qty, gameId) => {
    const file = fs.readFileSync(datafile);
    const records = csv(file, { columns: true });
    for(var count = 0; count < qty; count++) {
        const i = Math.floor(Math.random() * records.length);
        const person = records.splice(i, 1)[0]; // remove 1 element at index i
        const args = {
            gameId: gameId,
            login: person.login,
            name: person.name,
            organization: person.organization,
        };
        try {
          callAppSync(JOIN_GAME, args, 'JoinGame');
        } catch(e) {
          console.log('error:', e);//JSON.stringify(e));
          console.log('   person:', JSON.stringify(person));
          console.log('   args:', JSON.stringify(args));
        }
    }
}
