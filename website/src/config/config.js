/*
 * This is a STAND-IN file used by developers, that is also packaged and distributed into production.
 * For production deployments (S3 with CloudFront), a CloudFront mapping will point "config/config.js"
 * (this file) as a URI in the distribution elsewhere to the deployment-specific config file.
 * This is here so when the website is served by "npm start" it will pick-up configuration directly
 * from the parent interactive shell.  See README.md for a discussion and example.
 */

const REQUIRED_ENV_VARS = [
    'REACT_APP_QUIZSHOW_REGION',
    'REACT_APP_QUIZSHOW_GRAPHQL_ENDPOINT',
    'REACT_APP_QUIZSHOW_USERPOOL_ID',
    'REACT_APP_QUIZSHOW_USERPOOL_WEBCLIENT_ID'
];

REQUIRED_ENV_VARS.forEach(envvar => {
    const value = process.env[envvar];
    if (!value || value.length === 0)
        throw new Error(`Environment variable ${envvar} was missing or empty`);
});

export default {
    aws_appsync_region: process.env.REACT_APP_QUIZSHOW_REGION,
    aws_appsync_graphqlEndpoint: process.env.REACT_APP_QUIZSHOW_GRAPHQL_ENDPOINT,
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
    Auth: {
        region: process.env.REACT_APP_QUIZSHOW_REGION,
        userPoolId: process.env.REACT_APP_QUIZSHOW_USERPOOL_ID,
        userPoolWebClientId: process.env.REACT_APP_QUIZSHOW_USERPOOL_WEBCLIENT_ID,
        mandatorySignIn: true,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
}
