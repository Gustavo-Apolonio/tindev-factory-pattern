import mongoose from "mongoose";
import bcrypt from "bcrypt";

import createDevDatabase from "../databases/DevDatabase.js";

export default function createDevService() {
  const db = createDevDatabase();

  function verifyUsername(username) {
    if (username === "") throw "Please, insert an username...";
  }

  async function getDevByUsername(username) {
    verifyUsername(username);

    const resp = await db.getDevByUsername(username);
    return resp;
  }

  async function getDevByGitId(gitId) {
    if (gitId === "")
      throw "Git Hub Information with problems, please try again later...";

    const resp = await db.getDevByGitId(gitId);
    return resp;
  }

  function verifyDev(dev) {
    if (dev.git_id === "" || !dev.git_user_exists)
      throw "Git Hub Information with problems, please try again later...";

    if (dev.name === "") throw "Please, insert your name...";

    verifyUsername(dev.user);

    if (dev.password === "")
      throw "Please, insert a password to register yourself...";

    if (dev.avatar === "") throw "Please, insert an avatar...";
  }

  async function createDev(dev) {
    verifyDev(dev);

    const resp = await db.createDev(dev);
    return resp;
  }

  async function setDevUsername(dev, username) {
    verifyDev(dev);

    const resp = await db.setDevUsername(dev, username);
    return resp;
  }

  async function verifyPassword(password, devPassword) {
    if (password === "") throw "Please, insert your password...";

    const passwordMatch = await bcrypt.compare(password, devPassword);

    if (!passwordMatch) throw "Incorrect password...";
  }

  async function login(username, password) {
    const dev = await getDevByUsername(username);

    await verifyPassword(password, dev.password);

    return dev;
  }

  function verifyId(id) {
    if (!mongoose.isValidObjectId(id)) throw "Invalid or missing id...";
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

  async function getLikedDevs(dev) {
    const resp = await db.getLikedDevs(dev);
    return resp;
  }

  async function getDislikedDevs(dev) {
    const resp = await db.getDislikedDevs(dev);
    return resp;
  }

  async function updateDev(dev, infos) {
    const { name, password, bio } = infos;

    if (name === "") throw "Please, insert a new name...";
    if (password == "") throw "Please, insert a new password...";
    if (bio === "") bio = null;
    if (bio)
      if (bio.length > 160)
        throw "Please, respect the limit of 160 characters...";

    dev = await db.updateDev(dev, infos);

    return dev;
  }

  async function updateAvatar(dev, avatar) {
    if (avatar === "") throw "It wasn't possible to update your avatar...";

    dev = db.updateAvatar(dev, avatar);

    return dev;
  }

  return {
    getDevByUsername,
    getDevByGitId,
    createDev,
    setDevUsername,
    login,
    getDevById,
    getDevs,
    getLikedDevs,
    getDislikedDevs,
    updateDev,
    updateAvatar,
  };
}
