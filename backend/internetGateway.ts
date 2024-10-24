import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";

export const internetGateway = new aws.ec2.InternetGateway("igw", {
    vpcId: vpc.id,
});