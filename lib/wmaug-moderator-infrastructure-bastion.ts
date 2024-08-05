import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class Bastion extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const appName = "Bastion";
    const stackEnvironment = id.slice(0, -appName.length);
    console.log(stackEnvironment);
    cdk.Tags.of(this).add("Service", "Bastion");
    cdk.Tags.of(this).add("Environment", stackEnvironment);

    const vpc = ec2.Vpc.fromLookup(this, "VPC", {
      vpcName: `${stackEnvironment}Vpc`,
    });

    const bastionInstanceTyle = ec2.InstanceType.of(
      ec2.InstanceClass.T4G,
      ec2.InstanceSize.MICRO,
    );

    const bastion = new ec2.BastionHostLinux(
      this,
      `${stackEnvironment}BastionHost`,
      {
        vpc,
        subnetSelection: { subnetType: ec2.SubnetType.PUBLIC },
        instanceName: `${stackEnvironment}BastionHost`,
        instanceType: bastionInstanceTyle,
        requireImdsv2: true,
      },
    );

    // add permissions to the bastionHostLinux role to grant full actions to s3
    bastion.role.attachInlinePolicy(
      new iam.Policy(this, "S3FullAccess", {
        statements: [
          new iam.PolicyStatement({
            actions: ["s3:*"],
            resources: ["*"],
          }),
        ],
      }),
    );

    //export the instance ID, and dns
    new cdk.CfnOutput(this, "BastionInstanceId", { value: bastion.instanceId });
    new cdk.CfnOutput(this, "BastionInstanceDns", {
      value: bastion.instancePublicDnsName,
    });
  }
}
