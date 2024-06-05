import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';


export class Vpc extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    cdk.Tags.of(this).add('Service', 'Vpc');
    cdk.Tags.of(this).add('Environment', id);


    const vpc = new ec2.Vpc(this, 'VPC',
        {
          availabilityZones: ['us-east-2a', 'us-east-2b'],
          natGateways: 1,
          // vpcName starts with the environment name dynamically
          vpcName: id,
        },
    );

    new cdk.CfnOutput(this, 'VpcId', { value: vpc.vpcId });
    new cdk.CfnOutput(this, 'PublicSubnet1', { value: vpc.publicSubnets[0].subnetId });
    new cdk.CfnOutput(this, 'PublicSubnet2', { value: vpc.publicSubnets[1].subnetId });
    new cdk.CfnOutput(this, 'PrivateSubnet1', { value: vpc.privateSubnets[0].subnetId });
    new cdk.CfnOutput(this, 'PrivateSubnet2', { value: vpc.privateSubnets[1].subnetId });
    }
}
