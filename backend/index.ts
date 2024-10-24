import {vpc} from "./vpc";
import { publicSubnet , privateSubnet} from "./subnets";
import { internetGateway } from "./internetGateway";
import { natGateway} from "./natGateway";
import { publicRouteTable , privateRouteTable} from "./routeTables";
import { publicSecurityGroup , privateSecurityGroup} from "./securityGroups";

import { exec } from "child_process";
import * as util from "util";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";



const config = new pulumi.Config();
const instanceNames = config.require("instanceNames").split(",");

instanceNames.forEach((name) => {
    new aws.ec2.Instance(name, {
        instanceType: "t2.micro",
        ami: "ami-06b21ccaeff8cd686", 
        subnetId: privateSubnet.id,
        vpcSecurityGroupIds: [privateSecurityGroup.id],
        associatePublicIpAddress: true,
        keyName: "trinhdat",
        tags: { Name: name },
    });
});

