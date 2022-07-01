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

import { ticketRoutes } from "./api/routes/ticketRoutes";
import { accountRoutes } from "./api/routes/accountRoutes";
import { questionRoutes } from "./api/routes/questionRoutes";
const { HOST, PORT } = require('./config.json');

const app = express();

app.use(cors());
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
app.use("/api", ticketRoutes);
app.use("/api", accountRoutes);
app.use("/api/question", questionRoutes);

// catch 404 and forward to error handler

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