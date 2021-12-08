import mongoose from "mongoose";
import bcrypt from "bcrypt";

import createDevDatabase from "../databases/DevDatabase.js";

export default function createDevService() {
  const db = createDevDatabase();

  function verifyId(id) {
    if (!mongoose.isValidObjectId(id)) throw "ID is invalid...";
  }

  function verifyUsername(username) {
    if (username === "") throw "Please, insert an username...";
  }

  function verifyDev(dev) {
    if (dev.name === "") throw "Please, insert your name...";

    verifyUsername(dev.user);

    if (dev.password === "")
      throw "Please, insert a password to register yourself...";

    if (dev.avatar === "") throw "Please, insert an avatar...";
  }

  async function verifyPassword(password, devPassword) {
    if (password === "") throw "Please, insert your password...";

    const passwordMatch = await bcrypt.compare(password, devPassword);

    if (!passwordMatch) throw "Incorrect password...";
  }

  async function getDevById(id) {
    verifyId(id);

    const resp = await db.getDevById(id);
    return resp;
  }

  async function getDevs(dev) {
    const resp = await db.getDevs(dev);
    return resp;
  }

  async function getDevByUsername(username) {
    verifyUsername(username);

    const resp = await db.getDevByUsername(username);
    return resp;
  }

  async function createDev(dev) {
    verifyDev(dev);

    const resp = await db.createDev(dev);
    return resp;
  }

  async function login(username, password) {
    const dev = await getDevByUsername(username);

    await verifyPassword(password, dev.password);

    return dev;
  }

  return {
    login,
    getDevById,
    getDevs,
    getDevByUsername,
    createDev,
  };
}
