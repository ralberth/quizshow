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
            name
            organization
        }
    }
`;

const MOD_GQL = `
    mutation nominateContestant($quesId: Int!, $login: String!, $name: String!, $organization: String!) {
        nominateContestant(quesId: $quesId, login: $login, name: $name, organization: $organization) {
            quesId
            login
            name
            organization
            timebuzzed
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

callAppSync(GET_CONTESTANTS_GQL, {}, "listContestants", (contestants) => {
    const numToNominate = Math.floor(Math.random() * 15) + 5;
    for(var count = 0; count < numToNominate; count++) {
        const i = Math.floor(Math.random() * contestants.length);
        const person = contestants.splice(i, 1)[0]; // remove 1 element at index i
        // console.log("Person:", person);
        const args = {
            quesId: process.argv[2],
            login: person.login,
            name: person.name,
            organization: person.organization
        };
        callAppSync(MOD_GQL, args, 'nominateContestant', () => { });
    }
});
