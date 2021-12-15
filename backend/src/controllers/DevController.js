import { Router } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import createDevService from "../services/DevService.js";
import createDevUtils from "../utils/DevUtils.js";
import createGitHubAccess from "../utils/GitHubAccess.js";
import createImageStorage from "../utils/ImageStorage.js";

import createError from "../models/res/ErrorRes.js";

import auth from "../middlewares/authMiddleware.js";

dotenv.config();

const router = Router();
const srv = createDevService();
const cnv = createDevUtils();

const git = createGitHubAccess();
const img = createImageStorage();

import multer from "multer";
import bcrypt from "bcrypt";

import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profiles/images/");
  },
  filename: function (req, file, cb) {
    console.log(file)
    
    const name = path.parse(file.originalname).name;
    const ext = path.parse(file.originalname).ext;
    const cryptname = bcrypt
      .hashSync(name, 0)
      .replaceAll("/", "")
      .replaceAll(".", "");
    const fileName = cryptname + ext;

    cb(null, fileName);
  },
});

const parser = multer({ storage: storage });

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

    req.body.username = gitInfo.user;

    const user = await srv.getDevByUsername(gitInfo.user);

    if (user) {
      return login(req, res);
    }

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

    Object.keys(req.connectedDevs).map((connectedDev) => {
      const devSocket = req.connectedDevs[connectedDev];

      const io = req.io;

      const newDev = cnv.ToResponse(dev);

      io.to(devSocket).emit("newDev", { dev: newDev });
    });

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
      return login(req, res);
    }
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const dev_id = req.dev_id || "";

    const dev = await srv.getDevById(dev_id);

    if (!dev || !mongoose.isValidObjectId(dev._id))
      return res.status(404).send(createError(404, "User not found..."));

    const devs = await srv.getDevs(dev);

    const resp = cnv.ToResponses(devs);

    return res.status(200).send(resp);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

router.get("/liked", auth, async (req, res) => {
  try {
    const dev_id = req.dev_id || "";

    const dev = await srv.getDevById(dev_id);

    if (!dev || !mongoose.isValidObjectId(dev._id))
      return res.status(404).send(createError(404, "User not found..."));

    const devs = await srv.getLikedDevs(dev);

    const resp = cnv.ToResponses(devs);

    return res.status(200).send(resp);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

router.get("/disliked", auth, async (req, res) => {
  try {
    const dev_id = req.dev_id || "";

    const dev = await srv.getDevById(dev_id);

    if (!dev || !mongoose.isValidObjectId(dev._id))
      return res.status(404).send(createError(404, "User not found..."));

    const devs = await srv.getDislikedDevs(dev);

    const resp = cnv.ToResponses(devs);

    return res.status(200).send(resp);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    await img.updateImage(req, res)
    
    // await img.updateImage(req, res)
    
    // setTimeout(() => { 
    //   img.deleteImage(req.body.avatar.path)
    // }, 5000)
    
    
    // parser.any(["name", "bio", "password", "avatar"])(req, res, (err) => {
    //   console.log("any");
    //   console.log(req.body);
    //   if (err) console.log(err);
    //   else {
    //     console.log(req);
    //   }
    // });

    // parser.array("avatar", 1)(req, res, (err) => {
    //   console.log("array");
    //   console.log(req.body);
    //   if (err) console.log(err);
    //   else {
    //     console.log(req.file);
    //   }
    // });

    
    return res.status(200).send(req.body.avatar.path);
  } catch (error) {
    return res.status(400).send(createError(400, error))
  }
})

export default router;
