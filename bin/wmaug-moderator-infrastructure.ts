#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Vpc } from '../lib/wmaug-moderator-infrastructure-vpc';

const app = new cdk.App();


// loop through array of environments and create new stacks

const environments = ['devA', 'productionA'];

// loop through environments
environments.forEach((environment) => {
    new Vpc(app, `${environment}Vpc`, {
        env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-2' },
    });
});
