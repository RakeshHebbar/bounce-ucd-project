import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import Logger from "./utils/logger";
import {country_route} from "./api/country";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use(country_route);

// server port
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  Logger.info(`App listening on port http://localhost:${port}`);
});

// handled signals for shutdown
const signals = ["SIGTERM", "SIGINT"];

signals.forEach(function (signal) {
  gracefulShutDown(signal);
});

/**
 * This function gracefully shuts down and closes the connection
 * @param signal signal passed to shutdown the server
 */
function gracefulShutDown(signal: string) {
  process.on(signal, async () => {
    server.close();

    Logger.info("My work here is done...");

    process.exit(0);
  });
}

module.exports = app