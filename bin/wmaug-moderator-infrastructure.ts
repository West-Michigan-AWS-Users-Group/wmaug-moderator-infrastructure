#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Vpc } from "../lib/wmaug-moderator-infrastructure-vpc";
import { Bastion } from "../lib/wmaug-moderator-infrastructure-bastion";

const app = new cdk.App();

interface Environments {
  [key: string]: {
    vpc: boolean;
    bastion: boolean;
    region: string;
  };
}

// Define the environments to deploy. Toggle each stack with a boolean value and specify the region.
const cdkStacks: Environments = {
  devA: {
    vpc: false,
    bastion: false,
    region: "us-east-2",
  },
  productionA: {
    vpc: false,
    bastion: false,
    region: "us-east-2",
  },
};

Object.keys(cdkStacks).forEach((environment) => {
  const deployProps = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: cdkStacks[environment].region,
  };

  if (cdkStacks[environment].vpc) {
    new Vpc(app, `${environment}Vpc`, {
      env: deployProps,
    });
  }

  if (cdkStacks[environment].bastion) {
    new Bastion(app, `${environment}Bastion`, {
      env: deployProps,
    });
  }
});
