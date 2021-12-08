import { Router } from "express";
import mongoose from "mongoose";

import createDevService from "../services/DevService.js";
import createLikeService from "../services/LikeService.js";
import createDevUtils from "../utils/DevUtils.js";

import createError from "../models/res/ErrorRes.js";

import auth from "../middlewares/authMiddleware.js";

const router = Router();
const devSrv = createDevService();
const srv = createLikeService();
const cnv = createDevUtils();

router.post("/like/:targetId", auth, async (req, res) => {
  try {
    const loggedId = req.dev_id || "";
    const targetId = req.params.targetId || "";

    const loggedDev = await devSrv.getDevById(loggedId);

    if (!loggedDev || !mongoose.isValidObjectId(loggedDev._id))
      return res.status(404).send(createError(404, "User not found"));

    const targetDev = await devSrv.getDevById(targetId);

    if (!targetDev || !mongoose.isValidObjectId(targetDev._id))
      return res
        .status(404)
        .send(createError(404, "Selected user doesn't exist"));

    await srv.likeDev(loggedDev, targetDev);

    const loggedResp = cnv.ToResponse(loggedDev);

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedDevs[loggedDev._id];
      const targetSocket = req.connectedDevs[targetDev._id];

      const io = req.io;

      if (loggedSocket) {
        const targetResp = cnv.ToResponse(targetDev);

        io.to(loggedSocket).emit("match", targetResp);
      }

      if (targetSocket) {
        io.to(targetSocket).emit("match", loggedResp);
      }
    }

    return res.status(200).send(loggedResp);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

router.post("/dislike/:targetId", auth, async (req, res) => {
  try {
    const loggedId = req.dev_id || "";
    const targetId = req.params.targetId || "";

    const loggedDev = await devSrv.getDevById(loggedId);

    if (!loggedDev || !mongoose.isValidObjectId(loggedDev._id))
      return res.status(404).send(createError(404, "User not found"));

    const targetDev = await devSrv.getDevById(targetId);

    if (!targetDev || !mongoose.isValidObjectId(targetDev._id))
      return res
        .status(404)
        .send(createError(404, "Selected user doesn't exist"));

    await srv.dislikeDev(loggedDev, targetDev);

    const loggedResp = cnv.ToResponse(loggedDev);

    return res.status(200).send(loggedResp);
  } catch (error) {
    return res.status(400).send(createError(400, error));
  }
});

export default router;
