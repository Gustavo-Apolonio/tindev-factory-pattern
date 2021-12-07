import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export default function createDatabaseConnection() {
  async function connect() {
    console.log("...$ Trying to reach database...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("...$ Database connected!");
  }

  async function disconnect() {
    console.log("...$ Trying to disconnect database...");
    await mongoose.disconnect();
    console.log("...$ Database disconnected!");
  }

  return {
    connect,
    disconnect,
  };
}
