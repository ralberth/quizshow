const fs = require('fs');
const csv = require('csv-parse/lib/sync');
const AWS = require('aws-sdk');

const GAME_ID = process.argv[2];

var dynamodb = new AWS.DynamoDB({ region: 'us-east-1' });

const file = fs.readFileSync('contestants.csv');
const records = csv(file, { columns: true });
records.forEach(row => {
    var score = 0;
    if (Math.random() > 0.5)
        score = Math.floor(Math.random() * 1000);
    dynamodb.putItem({
        TableName: 'QuizContestants',
        Item: {
            gameId: { "N": GAME_ID },
            login: { "S": row.login },
            name: { "S": row.name },
            organization: { "S": row.organization },
            score: { "N": `${score}` }
        }
    },
    (err, data) => {
        if (err)
            console.log(err, err.stack);
    });
});
