exports.dynamoBatchWriteChunks = (dynamodb, tableName, items) => {
    var indx = 0;
    while(indx < items.length) {
        chunk = items.slice(indx, indx + 25);
        rqst = {
            RequestItems: {
                [tableName]: chunk
            }
        }
        dynamodb.batchWriteItem(rqst, (err, data) => {
            if (err) console.log("Error: ", err);
        });
        // console.log("Sending: ", JSON.stringify(rqst, null, 4));
        indx += 25;
    }
}
