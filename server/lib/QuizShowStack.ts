import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import appsync = require('@aws-cdk/aws-appsync');
import cognito = require('@aws-cdk/aws-cognito');
import dynamo = require('@aws-cdk/aws-dynamodb');
import s3 = require('@aws-cdk/aws-s3');
import { CloudFrontWebDistribution, CfnCloudFrontOriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import { AuthFlow, CfnUserPool } from '@aws-cdk/aws-cognito';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { Duration, RemovalPolicy } from '@aws-cdk/core';
import { AttributeType, ProjectionType } from '@aws-cdk/aws-dynamodb';
var fs = require('fs');
var yaml = require('js-yaml');

const DDB_IOPS = 20;
const REGION = 'us-east-1';


/*
 * WARNING: here's a quote from the CDK documentation as of Aug 25, 2019:
 *     "This is a developer preview (public beta) module. Releases might lack
 *      important features and might have future breaking changes."
 */


export class QuizShowStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        /***********************************************************************
         ** IAM Roles and Policies                                            **
         ***********************************************************************/

        const appSyncRole = new iam.Role(this, 'QuizShowAppSyncRole', {
            assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
            maxSessionDuration: Duration.hours(12),
            inlinePolicies: {}
        });

        const ddbPolicyStmt = new iam.PolicyStatement();
        ddbPolicyStmt.addActions("dynamodb:*")
        ddbPolicyStmt.addAllResources();
        appSyncRole.addToPolicy(ddbPolicyStmt);


        /***********************************************************************
         ** Cognito                                                           **
         ***********************************************************************/

        const userPool = new cognito.CfnUserPool(this, 'QuizShowPool', {
            adminCreateUserConfig: {
                allowAdminCreateUserOnly: false
            },
            autoVerifiedAttributes: [ "email" ],
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
                },
                {
                    name: "organization",
                    attributeDataType: "String",
                    mutable: true,
                    required: false,
                    stringAttributeConstraints: {
                        minLength: "0",
                        maxLength: "40"
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
                awsRegion: REGION,
                defaultAction: 'ALLOW',
                userPoolId: userPool.ref
            },
            additionalAuthenticationProviders: [
                {
                    authenticationType: 'API_KEY'
                }
            ]
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

        const gameDS = new appsync.CfnDataSource(this, 'games_table', {
            apiId: mySync.attrApiId,
            name: 'games',
            serviceRoleArn: appSyncRole.roleArn,
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

        const catgDS = new appsync.CfnDataSource(this, 'catgs_table', {
            apiId: mySync.attrApiId,
            name: 'categories',
            serviceRoleArn: appSyncRole.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: REGION,
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

        const quesDS = new appsync.CfnDataSource(this, 'ques_table', {
            apiId: mySync.attrApiId,
            name: 'questions',
            serviceRoleArn: appSyncRole.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: REGION,
                tableName: ddbQues.tableName
            }
        });

        const ddbCntst = new dynamo.Table(this, 'QuizContestants', {
            tableName: 'QuizContestants',
            partitionKey: { name: 'gameId', type: AttributeType.NUMBER },
            sortKey: { name: 'login', type: AttributeType.STRING },
            readCapacity: DDB_IOPS,
            writeCapacity: DDB_IOPS,
            removalPolicy: RemovalPolicy.DESTROY
        });

        const cntstDS = new appsync.CfnDataSource(this, 'cntst_table', {
            apiId: mySync.attrApiId,
            name: 'contestants',
            serviceRoleArn: appSyncRole.roleArn,
            type: 'AMAZON_DYNAMODB',
            dynamoDbConfig: {
                awsRegion: REGION,
                tableName: ddbCntst.tableName
            }
        });


        const nomDS = new appsync.CfnDataSource(this, 'nominee_table', {
            apiId: mySync.attrApiId,
            name: 'EmptyNominees',
            type: 'NONE'
        });


        /***********************************************************************
         ** App Sync Resolvers                                                **
         ***********************************************************************/

        const resolvers = yaml.safeLoad(fs.readFileSync('src/resolvers.yaml', 'utf8'));
        resolvers.forEach((resolver:any) => {
            const r = new appsync.CfnResolver(this, `${resolver.type}_${resolver.field}`, {
                apiId: mySync.attrApiId,
                kind: 'UNIT',
                typeName: resolver.type,
                fieldName: resolver.field,
                dataSourceName: resolver.dataSource,
                requestMappingTemplate: resolver.requestMapping,
                responseMappingTemplate: resolver.responseMapping
            });
            r.addDependsOn(gameDS);
            r.addDependsOn(catgDS);
            r.addDependsOn(quesDS);
            r.addDependsOn(cntstDS);
            r.addDependsOn(nomDS);
        });


        /***********************************************************************
         ** Website: S3, CloudFront                                           **
         ***********************************************************************/

        const bucketName = `quizshow-${process.env.USER}-cloudfront-origin`;
        const bucket = new s3.Bucket(this, bucketName, {
            bucketName: bucketName
        });

        // See AWS-CDK Issue: https://github.com/aws/aws-cdk/issues/941
        const cloudFrontOai = new CfnCloudFrontOriginAccessIdentity(this, 'OAI', {
            cloudFrontOriginAccessIdentityConfig: {
                comment: 'OAI for QuizShow website'
            }
        });

        const webDistro = new CloudFrontWebDistribution(this, 'QuizShowDist', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: bucket,
                        originAccessIdentityId: cloudFrontOai.ref
                    },
                    behaviors : [
                        { isDefaultBehavior: true }
                    ]
                }
            ],
            errorConfigurations: [
                {
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: '/index.html'
                }
            ]
        });

        const policyStatement = new iam.PolicyStatement();
        policyStatement.addActions('s3:ListBucket');
        policyStatement.addActions('s3:GetObject');
        policyStatement.addResources(bucket.bucketArn);
        policyStatement.addResources(`${bucket.bucketArn}/*`);
        policyStatement.addCanonicalUserPrincipal(cloudFrontOai.attrS3CanonicalUserId);

        bucket.addToResourcePolicy(policyStatement);
    }
}
