import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import cognito = require('@aws-cdk/aws-cognito');
import { AuthFlow } from '@aws-cdk/aws-cognito';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { Duration } from '@aws-cdk/core';

export class QuizShowStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const role = new iam.Role(this, 'QuizShowAppSyncRole', {
            assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
            maxSessionDuration: Duration.hours(12),
            inlinePolicies: {}
        });

        const statement = new iam.PolicyStatement();
        statement.addActions("dynamodb:*")
        statement.addAllResources();
        role.addToPolicy(statement);

        const userPool = new cognito.UserPool(this, 'QuizShowPool');
        new cognito.UserPoolClient(this, 'QuizShowUserPoolClient', {
            userPoolClientName: 'QuizShowUserPoolClient',
            userPool: userPool,
            enabledAuthFlows: [ AuthFlow.USER_PASSWORD ]
        });
    }
}
