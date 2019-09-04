const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.REACT_APP_QUIZSHOW_GRAPHQL_ENDPOINT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const apiKey = process.env.QUIZSHOW_APIKEY;

const GET_CONTESTANTS_GQL = `
    query listContestants {
        listContestants {
            login
        }
    }
`;

const MOD_GQL = `
    mutation nominateContestant($quesId: Int!, $login: String!) {
        nominateContestant(quesId: $quesId, login: $login) {
            login
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
        result.on('data', (data) => {
            // console.log(JSON.parse(data.toString()));
            callback(JSON.parse(data.toString()).data[opName]);
        });
    });
    httpRequest.write(req.body);
    httpRequest.end();
};

callAppSync(GET_CONTESTANTS_GQL, {}, "listContestants", (contestants) => {
    const numToNominate = Math.floor(Math.random() * 15) + 5;
    for(var count = 0; count < numToNominate; count++) {
        const i = Math.floor(Math.random() * contestants.length);
        const person = contestants.splice(i, 1)[0]; // remove 1 element at index i
        callAppSync(MOD_GQL, { quesId: process.argv[2], login: person.login }, 'nominateContestant',
            () => { });
    }
});
