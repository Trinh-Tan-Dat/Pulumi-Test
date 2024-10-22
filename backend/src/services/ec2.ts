import * as aws from "@pulumi/aws";
import { publicSecurityGroup, privateSecurityGroup } from "./securityGroups";
import { publicSubnet, privateSubnet } from "./subnets";
export const publicInstance = new aws.ec2.Instance("public-instance", {
    instanceType: "t2.micro",
    ami: "ami-06b21ccaeff8cd686",
    subnetId: publicSubnet.id,
    securityGroups: [publicSecurityGroup.id],
    associatePublicIpAddress: true,
    keyName: "trinhdat",
});

export const privateInstance = new aws.ec2.Instance("private-instance", {
    instanceType: "t2.micro",
    ami: "ami-06b21ccaeff8cd686",
    subnetId: privateSubnet.id,
    securityGroups: [privateSecurityGroup.id],
    keyName: "trinhdat",
});