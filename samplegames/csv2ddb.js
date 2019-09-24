/*
 * csv2ddb.js: convert a CSV quizgame input into a JSON file suitable for
 * passing to Dynamo via "aws dynamodb batch-write-item".
 * No arguments.  This reads all CSV files in the current directory.
 */

const fs = require('fs');
const csv = require('csv-parse/lib/sync');
const child_process = require('child_process');

var nextId = 100
var gameItems = []
var catgItems = []
var quesItems = []

if (process.argv[2] === "convert") {
    fs.readdir(".", (err, items) => {
        items.forEach(item => {
            if (item.startsWith("game_") && item.endsWith(".csv")) {
                console.log(`  parse ${item}`);
                basename = item.substring(5).split(".")[0];
                gameId = nextId++;
                gameItems.push({
                    "PutRequest": {
                        "Item": {
                            gameId: { "N": `${gameId}` },
                            emcee: { "S": process.env.USER },
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
} else if (process.argv[2] === "load") {
    fs.readdir(".", (err, items) => {
        items.forEach(item => {
            if (item.startsWith("Quiz") && item.endsWith(".json")) {
                console.log(` ${item}`)
                const out = child_process.execSync(`aws dynamodb batch-write-item --request-items file://${item}`);
                console.log(out.toString())
            }
        });
    });
} else {
    console.log("pass 'load' or 'convert' only as single parameter");
}
