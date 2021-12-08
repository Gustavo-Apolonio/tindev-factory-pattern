import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import createError from "../models/res/ErrorRes.js";

dotenv.config();

export default function Auth(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token)
    return res.status(401).send(createError(401, "Token not provided"));

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);

    req.dev_id = decoded.dev_id;

    return next();
  } catch (error) {
    return res.status(401).send(createError(401, "Invalid token"));
  }
}
