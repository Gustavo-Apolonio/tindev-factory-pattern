import bcrypt from "bcrypt";

import createDevRes from "../models/res/DevRes.js";
import createProfileDevRes from "../models/res/ProfileDevRes.js";

import dotenv from "dotenv";
dotenv.config();

function avatarWebDisplay(avatar) {
  avatar = avatar.includes("public/profiles/images")
    ? `${process.env.SERVER_ENV}${avatar.substr(avatar.indexOf("/", 1))}`
    : avatar;

  return avatar;
}

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
    let avatar = avatarWebDisplay(dev.avatar);

    return createProfileDevRes(
      dev._id,
      dev.git_user_exists,
      dev.name,
      dev.user,
      dev.password,
      dev.bio,
      dev.avatar,
      avatar
    );
  }

  function ToResponse(dev) {
    let avatar = avatarWebDisplay(dev.avatar);

    return createDevRes(dev._id, dev.name, dev.bio, avatar);
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
