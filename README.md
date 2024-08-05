# WMAUG Moderator Infrastructure

CDK project for deploying core infrastructure for the West Michigan AWS Users Group moderator account.

### VPC

This stack creates a VPC with public and private subnets in two availability zones with NAT Gateways and an internet gateway.
This is the base infrastructure for any VPC based workloads. VPC ids and subnet IDs are exported by means of CFN exports
for use in other stacks.

### Bastion

This stack creates a bastion host accessible via AWS SSM. Deploy and connect to the bastion host to access the private instances in the VPC.
This deploys Amazon Linux2 as the bastion host with an instance profile that allows full S3 access for long term storage
of things like backups.

```text
aws ssm start-session --target i-0123456789123 --profile <profile-name> --region <region>

Starting session with SessionId: user-aabbccddeeffggg
sh-4.2$
```
