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

const DDB_IOPS = 20;

/*
 * WARNING: here's a quote from the CDK documentation as of Aug 25, 2019:
 *     "This is a developer preview (public beta) module. Releases might lack
 *      important features and might have future breaking changes."
 */

export class QuizShowStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        /***********************************************************************
         ** IAM and Security                                                  **
         ***********************************************************************/

        const role = new iam.Role(this, 'QuizShowAppSyncRole', {
            assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
            maxSessionDuration: Duration.hours(12),
            inlinePolicies: {}
        });

        const statement = new iam.PolicyStatement();
        statement.addActions("dynamodb:*")
        statement.addAllResources();
        role.addToPolicy(statement);

        const userPool = new cognito.CfnUserPool(this, 'QuizShowPool', {
            adminCreateUserConfig: {
                allowAdminCreateUserOnly: false
            },
            policies: {
                passwordPolicy: {  // interface PasswordPolicyProperty
                    minimumLength: 6,
                    requireLowercase: false,
                    requireNumbers: false,
                    requireSymbols: false,
                    requireUppercase: false
                }
            },
            schema: [
                {
                    name: "nickname",
                    mutable: true,
                    required: true,
                    stringAttributeConstraints: {
                        minLength: "4",
                        maxLength: "20"
                    }
                }
            ]
        });

        new cognito.CfnUserPoolClient(this, 'QuizShowUserPoolClient', {
            userPoolId: userPool.ref,
            explicitAuthFlows: [ AuthFlow.USER_PASSWORD ]
        });


        /***********************************************************************
         ** APP SYNC SETUP                                                    **
         ***********************************************************************/

         const mySync = new appsync.CfnGraphQLApi(this, "QuizShow", {
            name: 'QuizShow',
            authenticationType: 'AMAZON_COGNITO_USER_POOLS',
            userPoolConfig: {
                awsRegion: 'us-east-1',
                defaultAction: 'ALLOW',
                userPoolId: userPool.ref
            }
        });

        const graphql = new appsync.CfnGraphQLSchema(this, 'QuizShowSchema', {
            apiId: mySync.attrApiId,
            definition: fs.readFileSync('src/schema.gql', 'utf8')
        });


        /***********************************************************************
         ** Dynamo Tables and Data Sources                                    **
         ***********************************************************************/

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

        new appsync.CfnDataSource(this, 'catgs_table', {
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
            partitionKey: { name: 'catgId', type: AttributeType.NUMBER },
            sortKey: { name: 'quesId', type: AttributeType.NUMBER },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            removalPolicy: RemovalPolicy.DESTROY
        });
        ddbQues.addGlobalSecondaryIndex({
            indexName: 'QuesId',
            partitionKey: { name: 'quesId', type: AttributeType.NUMBER },
            projectionType: ProjectionType.ALL
        });

        new appsync.CfnDataSource(this, 'ques_table', {
            apiId: mySync.attrApiId,
            name: 'questions',
            serviceRoleArn: role.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: 'us-east-1',
                tableName: ddbQues.tableName
            }
        });

        new dynamo.Table(this, 'QuizContestants', {
            tableName: 'QuizContestants',
            partitionKey: { name: 'gameId', type: AttributeType.NUMBER },
            sortKey: { name: 'login', type: AttributeType.STRING },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            removalPolicy: RemovalPolicy.DESTROY
        });

        new appsync.CfnDataSource(this, 'cntst_table', {
            apiId: mySync.attrApiId,
            name: 'contestants',
            serviceRoleArn: role.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: 'us-east-1',
                tableName: ddbQues.tableName
            }
        });


        /***********************************************************************
         ** App Sync Resolvers                                                **
         ***********************************************************************/

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
