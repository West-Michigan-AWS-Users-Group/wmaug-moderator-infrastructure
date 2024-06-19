#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Vpc } from '../lib/wmaug-moderator-infrastructure-vpc';

const app = new cdk.App();


interface Environments {
    [key: string]: boolean;
}

const environments: Environments = {
    devA: true,
    productionA: false,
};

Object.keys(environments).forEach((environment) => {
    if (!environments[environment]) {
        return;
    }
    new Vpc(app, `${environment}Vpc`, {
        env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-2' },
    });
});
