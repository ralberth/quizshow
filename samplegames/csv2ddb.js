/*
 * csv2ddb.js: convert a CSV quizgame input into a JSON file suitable for
 * passing to Dynamo via "aws dynamodb batch-write-item".
 * No arguments.  This reads all CSV files in the current directory.
 *
 * Send this in:
 *    1. node csv2ddb.js
 *    2. Set environment variables or use a "--profile" in the command below
 *    3. for file in *.json; do
 *          aws dynamodb batch-write-item --request-items file://$file
 *       done
 */

const fs = require('fs');
const csv = require('csv-parse/lib/sync');

var nextId = 100
var gameItems = []
var catgItems = []
var quesItems = []

fs.readdir(".", (err, items) => {
    items.forEach(item => {
        if (item.endsWith(".csv")) {
            basename = item.split(".")[0];
            gameId = nextId++;
            gameItems.push({
                "PutRequest": {
                    "Item": {
                        gameId: { "N": `${gameId}` },
                        owner: { "S": process.env.USER },
                        title: { "S": basename }
                    }
                }
            });
            var catg2idMap = {}
            const contents = fs.readFileSync(item);
            const records = csv(contents, { columns: true });
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
                            gameId: { "N": `${gameId}` },
                            catgId: { "N": `${catgId}` },
                            quesId: { "N": `${nextId++}` },
                            prize: { "N": `${row.prize}` },
                            question: { "S": row.question },
                            answer: { "S": row.answer }
                        }
                    }
                });
            });
        }
    });

    fs.writeFileSync("QuizGames.json", JSON.stringify({ "QuizGames": gameItems }, null, 4));
    fs.writeFileSync("QuizCategories.json", JSON.stringify({ "QuizCategories": catgItems }, null, 4));

    let indx = 0;
    let fileNum = 1;
    while(indx < quesItems.length) {
        chunk = quesItems.slice(indx, 25 + indx);
        fs.writeFileSync(`QuizQuestions-${fileNum++}.json`, JSON.stringify({ "QuizQuestions": chunk }, null, 4));
        indx += 25;
    }
});
