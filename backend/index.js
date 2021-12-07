import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io"

import Next from "./src/middlewares/nextMiddleware.js";
import createDatabaseConnection from "./src/databases/scripts/index.js";
import Routes from "./routes.js";

dotenv.config();
const Database = createDatabaseConnection();

function startServer() {
  const app = express();
  const server = http.Server(app);
  const io = new Server(server);

  const connectedDevs = {};
  io.on("connection", (socket) => {
    console.log(socket)
    const { devId } = socket.handshake.query;

    connectedDevs[devId] = socket.id;
  });

  Next(app, io, connectedDevs);
  Routes(express, app);

  const port = process.env.PORT || 5001;
  server.listen(port, () => {
    console.info(`...$ API on connected in http://localhost:${port}/`);
  });
}

function stopServer(error) {
  console.info(`...$ An error occurred while trying to start API`);
  console.error(`...$ Error => ${error}`);
  Database.disconnect().then(() => process.exit(0));
}

Database.connect().then(startServer).catch(stopServer);
