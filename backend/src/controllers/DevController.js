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

async function login(req, res) {
  let dev = req.dev;

  const password = req.body.password || "";

  dev = await srv.login(dev.user, password);

  const token = jwt.sign({ dev_id: dev._id }, process.env.TOKEN);

  const devResp = cnv.ToProfileResponse(dev);

  const resp = {
    token,
    dev: devResp,
  };

  return resp;
}

async function createUser(req, res) {
  const git_id = req.body.git_id || "";
  const git_user_exists = req.body.git_user_exists || false;
  const name = req.body.name || "";
  const user = req.body.username || "";
  const password = req.body.password || "";
  const bio = req.body.bio || "";
  const avatar = req.body.avatar || "";

  const tableDev = await cnv.ToTable(
    git_id,
    git_user_exists,
    name,
    user,
    password,
    bio,
    avatar
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

    if (devSocket) {
      const io = req.io;

      const newDev = cnv.ToResponse(dev);

      io.to(devSocket).emit("newDev", { dev: newDev });
    }
  });

  req.dev = dev;
}

async function updateUser(req, res) {
  let dev = req.dev;
  const username = req.body.username || "";

  dev = await srv.setDevUsername(dev, username);

  req.dev = dev;
}

router.post("/app", async (req, res) => {
  try {
    const username = req.body.username || "";

    let user = await srv.getDevByUsername(username);

    if (!user || !mongoose.isValidObjectId(user._id)) {
      const gitInfo = await git.getUser(username);

      if (!gitInfo)
        return res
          .status(404)
          .send(createError(404, "Git Hub User not found..."));

      user = await srv.getDevByGitId(gitInfo.git_id);

      if (!user || !mongoose.isValidObjectId(user._id)) {
        req.body.name = gitInfo.name;
        req.body.username = gitInfo.user;
        req.body.git_id = gitInfo.git_id;
        req.body.git_user_exists = true;
        req.body.bio = gitInfo.bio;
        req.body.avatar = gitInfo.avatar;

        await createUser(req, res);
      } else {
        req.dev = user;

        if (user.user.toLowerCase() !== gitInfo.user.toLowerCase()) {
          req.body.username = gitInfo.user;
          await updateUser(req, res);
        }
      }
    } else req.dev = user;

    const resp = await login(req, res);

    return res.status(200).send(resp);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

// refactoring

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

router.put("/profile", auth, async (req, res) => {
  try {
    await img.updateImage(req, res);

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
    return res.status(400).send(createError(400, error));
  }
});

export default router;
