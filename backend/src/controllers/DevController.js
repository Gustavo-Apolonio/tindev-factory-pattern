import { Router } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import createDevService from "../services/DevService.js";
import createDevUtils from "../utils/DevUtils.js";
import createGitHubAccess from "../utils/GitHubAccess.js";

import createError from "../models/res/ErrorRes.js";

dotenv.config();

const router = Router();
const srv = createDevService();
const cnv = createDevUtils();

const git = createGitHubAccess();

async function login(req, res) {
  try {
    const username = req.body.username || "";
    const password = req.body.password || "";

    const dev = await srv.login(username, password);

    const token = jwt.sign({ dev_id: dev._id }, process.env.TOKEN);

    const devResp = cnv.ToResponse(dev);

    const resp = {
      token,
      dev: devResp,
    };

    return res.status(200).send(resp);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
}

async function createUser(req, res) {
  try {
    const username = req.body.username || "";

    const gitInfo = await git.getUser(username);

    if (!gitInfo)
      return res
        .status(404)
        .send(createError(404, "Git Hub User not found..."));

    const password = req.body.password || "";

    const tableDev = await cnv.ToTable(
      gitInfo.name,
      gitInfo.user,
      password,
      gitInfo.bio,
      gitInfo.avatar
    );

    const dev = await srv.createDev(tableDev);

    if (!dev || !mongoose.isValidObjectId(dev._id))
      return res
        .status(500)
        .send(
          createError(
            500,
            "It wasn't possible to create an user... Please, try again later!"
          )
        );

    req.dev = dev;

    return login(req, res);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
}

router.post("/app", async (req, res) => {
  try {
    const username = req.body.username || "";

    const user = await srv.getDevByUsername(username);

    if (!user || !mongoose.isValidObjectId(user._id))
      return createUser(req, res);
    else {
      req.dev = user;
      return login(req, res);
    }
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

export default router;
