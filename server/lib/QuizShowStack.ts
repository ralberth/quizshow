import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import appsync = require('@aws-cdk/aws-appsync');
import cognito = require('@aws-cdk/aws-cognito');
import dynamo = require('@aws-cdk/aws-dynamodb');
import { AuthFlow } from '@aws-cdk/aws-cognito';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { Duration, RemovalPolicy } from '@aws-cdk/core';
import { AttributeType, ProjectionType } from '@aws-cdk/aws-dynamodb';
var fs = require('fs');
var yaml = require('js-yaml');

// Read this value from ENV likely... then codedeploy can trigger it on stage
const DDB_IOPS = 20;

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
        const userPoolClient = new cognito.UserPoolClient(this, 'QuizShowUserPoolClient', {
            userPoolClientName: 'QuizShowUserPoolClient',
            userPool: userPool,
            enabledAuthFlows: [ AuthFlow.USER_PASSWORD ]
        });

        const mySync = new appsync.CfnGraphQLApi(this, "QuizShow", {
            name: 'QuizShow',
            authenticationType: 'AMAZON_COGNITO_USER_POOLS',
            userPoolConfig: {
                awsRegion: 'us-east-1',
                defaultAction: 'ALLOW',
                userPoolId: userPool.userPoolId
            }
        });

        const graphql = new appsync.CfnGraphQLSchema(this, 'QuizShowSchema', {
            apiId: mySync.attrApiId,
            definition: fs.readFileSync('src/schema.gql', 'utf8')
        });

        const ddbGame = new dynamo.Table(this, 'QuizGames', {
            tableName: 'QuizGames',
            partitionKey: { name: 'gameId', type: AttributeType.NUMBER },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            removalPolicy: RemovalPolicy.DESTROY
        });
        ddbGame.addGlobalSecondaryIndex({
            indexName: 'EmceeByGameId',
            partitionKey: { name: 'emcee', type: AttributeType.STRING },
            sortKey: { name: 'gameId', type: AttributeType.NUMBER },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            projectionType: ProjectionType.ALL
        });

        const gameDataSource = new appsync.CfnDataSource(this, 'games_table', {
            apiId: mySync.attrApiId,
            name: 'games',
            serviceRoleArn: role.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: 'us-east-1',
                tableName: ddbGame.tableName
            }
        });

        const ddbCatg = new dynamo.Table(this, 'QuizCategories', {
            tableName: 'QuizCategories',
            partitionKey: { name: 'gameId', type: AttributeType.NUMBER },
            sortKey: { name: 'catgId', type: AttributeType.NUMBER },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            removalPolicy: RemovalPolicy.DESTROY
        });

        const catgDataSource = new appsync.CfnDataSource(this, 'catgs_table', {
            apiId: mySync.attrApiId,
            name: 'categories',
            serviceRoleArn: role.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: 'us-east-1',
                tableName: ddbCatg.tableName
            }
        });

        const ddbQues = new dynamo.Table(this, 'QuizQuestions', {
            tableName: 'QuizQuestions',
            partitionKey: { name: 'gameId', type: AttributeType.NUMBER },
            sortKey: { name: 'quesId', type: AttributeType.NUMBER },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            removalPolicy: RemovalPolicy.DESTROY
        });
        ddbQues.addGlobalSecondaryIndex({
            indexName: 'QuesId',
            partitionKey: { name: 'quesId', type: AttributeType.NUMBER },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            projectionType: ProjectionType.ALL
        });

        const quesDataSource = new appsync.CfnDataSource(this, 'ques_table', {
            apiId: mySync.attrApiId,
            name: 'questions',
            serviceRoleArn: role.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: 'us-east-1',
                tableName: ddbQues.tableName
            }
        });

        const resolvers = yaml.safeLoad(fs.readFileSync('src/resolvers.yaml', 'utf8'));
        resolvers.forEach((resolver:any)=> {
            const r = new appsync.CfnResolver(this, `${resolver.type}_${resolver.field}`, {
                apiId: mySync.attrApiId,
                kind: 'UNIT',
                typeName: resolver.type,
                fieldName: resolver.field,
                dataSourceName: resolver.dataSource,
                requestMappingTemplate: resolver.requestMapping,
                responseMappingTemplate: resolver.responseMapping
            });
            r.addDependsOn(gameDataSource);
            r.addDependsOn(graphql)
        });
    }
}
