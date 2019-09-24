const DynamoDB = require('aws-sdk/clients/dynamodb');
const dynamoBatchWriteChunks = require('./batchwrite').dynamoBatchWriteChunks;

const deleteItems = (ddb, tableName, items) => {
    items = items.map(item => { return { Key: item }});
    batchUpdates = items.map(item => { return { DeleteRequest: item }});
   dynamoBatchWriteChunks(ddb, tableName, batchUpdates);
}

const handleCleanTable = (ddb, tableName, filterExp) => {
    const allItems = ddb.scan(filterExp, (err, data) => {
        if (err)
            console.log("Error:", err);
        else
            deleteItems(ddb, tableName, data.Items);
    });
}

exports.cleanTables = (argv) => {
    const ddb = new DynamoDB({ region: process.env.REACT_APP_QUIZSHOW_REGION });
    handleCleanTable(ddb, 'QuizGames', {
        TableName: "QuizGames",
        ExpressionAttributeNames: { "#gameId": "gameId" },
        ProjectionExpression: "#gameId"
    });
    handleCleanTable(ddb, 'QuizCategories', {
        TableName: "QuizCategories",
        ExpressionAttributeNames: { "#gameId": "gameId", "#catgId": "catgId" },
        ProjectionExpression: "#gameId, #catgId"
    });
    handleCleanTable(ddb, 'QuizQuestions', {
        TableName: "QuizQuestions",
        ExpressionAttributeNames: { "#catgId": "catgId", "#quesId": "quesId" },
        ProjectionExpression: "#catgId, #quesId"
    });
}
