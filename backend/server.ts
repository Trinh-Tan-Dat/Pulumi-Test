import express from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
import * as util from "util";
import { EC2Client, DescribeInstancesCommand, CreateTagsCommand, TerminateInstancesCommand } from "@aws-sdk/client-ec2";
const ec2Client = new EC2Client({ region: "us-east-1" });

const app = express();
app.use(bodyParser.json());

// Utility to run shell commands
const execPromise = util.promisify(exec);

// Keep track of existing instances
let instanceNames: string[] = [];

app.post("/stack/create", async (req: express.Request, res: express.Response) => {
    const { instanceName } = req.body;

    if (!instanceName) {
        res.status(400).send("Instance name is required.");
    }

    // Add the new instance name to the list if it doesn't exist
    if (!instanceNames.includes(instanceName)) {
        instanceNames.push(instanceName);
    }

    try {
        // Update Pulumi config to include all instance names
        const namesConfig = instanceNames.join(",");
        const pulumiCommand = `pulumi config set instanceNames ${namesConfig} && pulumi up --yes`;

        // Execute the Pulumi command to apply changes
        await execPromise(pulumiCommand);

        res.status(201).send(`EC2 instances "${instanceNames.join(", ")}" processed successfully.`);
    } catch (error) {
        res.status(500).send(`Failed to process EC2 instances: ${error}`);
    }
});

app.get("/stack/status", async (req: express.Request, res: express.Response) => {
    try {
        const command = new DescribeInstancesCommand({
            Filters: [
                {
                    Name: "instance-state-name",
                    Values: ["running", "pending", "stopping", "stopped"]
                }
            ]
        });
        const data = await ec2Client.send(command);

        const statuses = (data.Reservations ?? []).map(reservation =>
            (reservation.Instances ?? []).map(instance => ({
                InstanceId: instance?.InstanceId ?? "N/A",
                State: instance?.State?.Name ?? "Unknown",
                InstanceType: instance?.InstanceType ?? "N/A",
                PublicIpAddress: instance?.PublicIpAddress ?? "N/A",
                PrivateIpAddress: instance?.PrivateIpAddress ?? "N/A",
            }))
        ).flat();
        res.json({ statuses });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


app.put("/stack/update", async (req: express.Request, res: express.Response) => {
    const { instanceId, newName } = req.body;

    if (!instanceId || !newName) {
        res.status(400).send("ID and name are required.");
    }

    try {
        const command = new CreateTagsCommand({
            Resources: [instanceId],
            Tags: [
                {
                    Key: "Name",
                    Value: newName,
                },
            ],
        });

        await ec2Client.send(command);
        res.status(200).send(`EC2 instance "${instanceId}" renamed to "${newName}" successfully.`);
    } catch (error) {
        res.status(500).send(`Failed to update name for EC2 instance: ${error}`);
    }
});


app.delete("/stack/delete", async (req: express.Request, res: express.Response) => {
    const { instanceId } = req.body;

    if (!instanceId) {
        res.status(400).send("Instance ID is required.");
    }

    try {
        const command = new TerminateInstancesCommand({
            InstanceIds: [instanceId],
        });

        await ec2Client.send(command);
        res.status(200).send(`EC2 instance "${instanceId}" terminated successfully.`);
    } catch (error) {
        res.status(500).send(`Failed to terminate EC2 instance: ${error}`);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
