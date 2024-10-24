import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";
import { publicSubnet } from "./subnets";
const eip = new aws.ec2.Eip("nat-eip", {
    vpc: true,
});

export const natGateway = new aws.ec2.NatGateway("nat-gateway", {
    allocationId: eip.id,
    subnetId: publicSubnet.id,
});