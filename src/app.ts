import express, { json } from "express";
import { env } from "process";
import router from "./routes/router";

const app = express();

const environment = env.ENVIRONMENT === "dev";

// if (!environment) app.use(cors());

// JSON middleware
app.use(json());

app.use("/api/v1", router);

export { app };
