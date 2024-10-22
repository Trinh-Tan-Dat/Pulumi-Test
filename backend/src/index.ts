import express from "express";
import stackRoutes from "./routes/stackRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/stack", stackRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
