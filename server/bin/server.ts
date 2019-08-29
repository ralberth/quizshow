#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { QuizShowStack } from '../lib/QuizShowStack';

const app = new cdk.App();
new QuizShowStack(app, 'QuizShow', {
    env: {
        region: process.env['REACT_APP_QUIZSHOW_REGION'],
        account: process.env['QUIZSHOW_ACCOUNT']
    }
});
