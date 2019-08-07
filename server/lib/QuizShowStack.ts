import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import appsync = require('@aws-cdk/aws-appsync');
import cognito = require('@aws-cdk/aws-cognito');
import dynamo = require('@aws-cdk/aws-dynamodb');
import { AuthFlow } from '@aws-cdk/aws-cognito';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { Duration } from '@aws-cdk/core';
import { AttributeType, ProjectionType } from '@aws-cdk/aws-dynamodb';
var fs = require('fs');
var yaml = require('js-yaml');

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

        const ddbQuiz = new dynamo.Table(this, 'quiz', {
            tableName: 'quiz',
            partitionKey: { name: 'id', type: AttributeType.NUMBER },
            readCapacity: 5,
            writeCapacity: 5
        });
        ddbQuiz.addGlobalSecondaryIndex({
            indexName: 'userQuiz',
            partitionKey: { name: 'owner', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.NUMBER },
            projectionType: ProjectionType.INCLUDE,
            nonKeyAttributes: [ 'title' ]
      });

      const quizDataSource = new appsync.CfnDataSource(this, 'quiz_table', {
          apiId: mySync.attrApiId,
          name: 'quiz',
          serviceRoleArn: role.roleArn,
          type: 'AMAZON_DYNAMODB',
          dynamoDbConfig: {
            awsRegion: 'us-east-1',
            tableName: 'quiz'
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
          r.addDependsOn(quizDataSource);
          r.addDependsOn(graphql)
      });
  }
}
