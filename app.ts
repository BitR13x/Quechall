import express, { Request, Response } from "express";
import { MyDataSource } from "./ormconfig";
import path from 'path';
import "reflect-metadata";
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from "helmet";
const compression = require('compression');
const cookieParser = require("cookie-parser");
const hpp = require('hpp');

import { accountRoutes } from "./api/routes/accountRoutes";
import { feebackRoutes } from "./api/routes/feedbackRoutes";
import { VaultRoutes } from "./api/routes/vaultRoutes";
import { profileRoutes } from "./api/routes/profileRoutes";
import { customVaultRoutes } from "./api/routes/customVaultRoutes";
import { env } from "process";

const { HOST, PORT } = require('./config.json');

const app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  }));
app.use(helmet());
app.use(hpp());
app.use(compression())
app.use("/api", accountRoutes);
app.use("/api/feedback", feebackRoutes);
app.use("/api/vault", VaultRoutes);
app.use("/api/custom", customVaultRoutes);
app.use("/api/profile", profileRoutes);

// //? status monitor /status
// if (!env.production) {
//   app.use(require('express-status-monitor')());
// };


//? custom 404 not found
app.get('*', (_req: Request, res: Response) => {
    return res.status(404).sendFile(path.join(__dirname, 'build/index.html'));
});


//? starting webApp
MyDataSource.initialize().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Web App listening at http://${HOST}:${PORT}`)
    });
})