import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";
import { internetGateway } from "./internetGateway";
import { natGateway } from "./natGateway";
import { publicSubnet, privateSubnet } from "./subnets";
const publicRouteTable = new aws.ec2.RouteTable("public-route-table", {
    vpcId: vpc.id,
    routes: [{
        cidrBlock: "0.0.0.0/0",
        gatewayId: internetGateway.id,
    }],
});

new aws.ec2.RouteTableAssociation("public-rta", {
    subnetId: publicSubnet.id,
    routeTableId: publicRouteTable.id,
});

const privateRouteTable = new aws.ec2.RouteTable("private-route-table", {
    vpcId: vpc.id,
    routes: [{
        cidrBlock: "0.0.0.0/0",
        natGatewayId: natGateway.id,
    }],
});

new aws.ec2.RouteTableAssociation("private-rta", {
    subnetId: privateSubnet.id,
    routeTableId: privateRouteTable.id,
});