import express from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
import * as util from "util";

const app = express();
app.use(bodyParser.json());

// Utility to run shell commands
const execPromise = util.promisify(exec);

// Keep track of existing instances
let instanceNames: string[] = [];

app.post("/ec2", async (req: express.Request, res: express.Response) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
