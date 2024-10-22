import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";

export const publicSecurityGroup = new aws.ec2.SecurityGroup("public-ec2-sg", {
    vpcId: vpc.id,
    ingress: [{
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
        cidrBlocks: ["0.0.0.0/0"],
    }],
    egress: [{
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
    }],
});

export const privateSecurityGroup = new aws.ec2.SecurityGroup("private-ec2-sg", {
    vpcId: vpc.id,
    ingress: [{
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
        securityGroups: [publicSecurityGroup.id],
    }],
    egress: [{
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
    }],
});