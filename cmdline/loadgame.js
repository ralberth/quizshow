const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/lib/sync');
// const child_process = require('child_process');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const dynamoBatchWriteChunks = require('./batchwrite').dynamoBatchWriteChunks;

var nextId = 1
var gameItems = []
var catgItems = []
var quesItems = []

const parseFile = (gameTitle, records) => {
    const gameId = nextId++;
    gameItems.push({
        "PutRequest": {
            "Item": {
                gameId: { "N": `${gameId}` },
                emcee: { "S": process.env.USER },
                title: { "S": gameTitle }
            }
        }
    });

    var catg2idMap = {};
    records.forEach(row => {
        let catgId = catg2idMap[row.category];
        if (!catgId) {
            catgId = nextId++;
            catg2idMap[row.category] = catgId;
            catgItems.push({
                "PutRequest": {
                    "Item": {
                        gameId: { "N": `${gameId}` },
                        catgId: { "N": `${catgId}` },
                        categoryName: { "S": row.category }
                    }
                }
            });
        }
        quesItems.push({
            "PutRequest": {
                "Item": {
                    catgId: { "N": `${catgId}` },
                    quesId: { "N": `${nextId++}` },
                    points: { "N": `${row.points}` },
                    categoryName: { "S": row.category },
                    question: { "S": row.question },
                    answer: { "S": row.answer },
                    state: { "S" : "ready" }
                }
            }
        });
    });
}


exports.loadGame = (argv) => {
    argv.files.forEach(file => {
        console.log(`  ${file}`);
        gameTitle = path.basename(file, '.csv');
        contents = fs.readFileSync(file);
        records = csv(contents, { columns: true });
        parseFile(gameTitle, records);
    });
    const ddb = new DynamoDB({ region: process.env.REACT_APP_QUIZSHOW_REGION });
    dynamoBatchWriteChunks(ddb, "QuizGames", gameItems);
    dynamoBatchWriteChunks(ddb, "QuizCategories", catgItems);
    dynamoBatchWriteChunks(ddb, "QuizQuestions", quesItems);
}
