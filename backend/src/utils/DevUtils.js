import bcrypt from "bcrypt";

import createDevRes from "../models/res/DevRes.js";

export default function createDevUtils() {
  async function encryptPassword(password) {
    if (password === "") return "";
    const encrypted = await bcrypt.hash(password, 10);
    return encrypted;
  }

  async function ToTable(name, user, password, bio, avatar) {
    const resp = {
      name,
      user,
      password: await encryptPassword(password),
      bio,
      avatar,
      likes: [],
      dislikes: [],
    };

    return resp;
  }

  function ToResponse(dev) {
    return createDevRes(dev._id, dev.name, dev.bio, dev.avatar);
  }

  return {
    ToTable,
    ToResponse,
  };
}
