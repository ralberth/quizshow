#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { QuizShowStack } from '../lib/QuizShowStack';

const app = new cdk.App();
new QuizShowStack(app, 'QuizShow', {
    env: {
        region: process.env['AWS_REGION'],
        account: process.env['AWS_ACCOUNT']
    }
});
