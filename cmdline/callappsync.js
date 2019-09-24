const https = require('https');
const AWS = require("aws-sdk");

const appsyncUrl = process.env.REACT_APP_QUIZSHOW_GRAPHQL_ENDPOINT;
const region = process.env.REACT_APP_QUIZSHOW_REGION;
const apiKey = process.env.REACT_APP_QUIZSHOW_APIKEY || process.env.QUIZSHOW_APIKEY;

const urlParse = require("url").URL;
const endpoint = new urlParse(appsyncUrl).hostname.toString();


exports.callAppSync = (query, args, opName, callback) => {
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
            callback(bodyObj.data[opName]);
        });
    });
    httpRequest.write(req.body);
    httpRequest.end();
};
