import bcrypt from "bcrypt";

import createDevRes from "../models/res/DevRes.js";
import createProfileDevRes from "../models/res/ProfileDevRes.js";

export default function createDevUtils() {
  async function encryptPassword(password) {
    if (password === "") return "";
    const encrypted = await bcrypt.hash(password, 10);
    return encrypted;
  }

  async function ToTable(
    git_id,
    git_user_exists,
    name,
    user,
    password,
    bio,
    avatar
  ) {
    const resp = {
      git_id,
      git_user_exists,
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

  function ToProfileResponse(dev) {
    return createProfileDevRes(
      dev._id,
      dev.git_user_exists,
      dev.name,
      dev.user,
      dev.password,
      dev.bio,
      dev.avatar
    );
  }

  function ToResponse(dev) {
    return createDevRes(dev._id, dev.name, dev.bio, dev.avatar);
  }

  function ToResponses(devs) {
    const resp = devs.map((dev) => ToResponse(dev));
    return resp;
  }

  return {
    encryptPassword,
    ToTable,
    ToProfileResponse,
    ToResponses,
    ToResponse,
  };
}
