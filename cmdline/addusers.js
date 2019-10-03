const csv = require('csv-parse/lib/sync');
const fs = require('fs');
const AWS = require('aws-sdk');

const TEMP_PASSWD = 'GJFNVBkedpq123!@#';

exports.addUsers = (csvfile, userpool, emailtmpl) => {
    const file = fs.readFileSync(csvfile);
    const records = csv(file, { columns: true });
    const cognito = new AWS.CognitoIdentityServiceProvider({ region: process.env.QUIZSHOW_REGION });

    records.forEach(row => {
        const params = {
            UserPoolId: userpool,
            Username: row.login,
            TemporaryPassword: TEMP_PASSWD,
            MessageAction: 'SUPPRESS',
            UserAttributes: [
                { Name: 'name', Value: row.given_name },
                { Name: 'nickname', Value: row.given_name },
                { Name: 'given_name', Value: row.given_name },
                { Name: 'family_name', Value: row.family_name },
                { Name: 'email', Value: emailtmpl.replace('LOGIN', row.login) },
                { Name: 'email_verified', Value: 'true' },
                { Name: 'custom:organization', Value: row.organization }
            ]
        };
        cognito.adminCreateUser(params, (err, data) => {
            if (err)
                console.log(err, err.stack);
            else {
                const params = {
                    UserPoolId: userpool,
                    Username: row.login,
                    Password: row.password,
                    Permanent: true
                };
                cognito.adminSetUserPassword(params, (err, data) => {
                    if (err)
                        console.log(err, err.stack);
                });
            }
        });
    });
}
