import multer from "multer";
import bcrypt from "bcrypt";

import path from "path";
import fs from "fs";
import util from "util";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profiles/images/");
  },
  filename: function (req, file, cb) {
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

export default function createImageStorage() {
  async function createImage(req, res) {
    const upload = util.promisify(
      parser.any(["name", "bio", "password", "avatar"])
    );

    await upload(req, res);

    const file = {
      originalname: req.files[0].originalname,
      path: `${req.files[0].destination}${req.files[0].filename}`,
    };

    req.body.avatar = file;
  }

  async function updateImage(req, res) {
    await createImage(req, res);
    const { last_avatar } = req.body;
    deleteImage(req, last_avatar);
  }

  function deleteImage(req, path) {
    req.body.last_avatar = req.body.avatar.path;
    fs.unlinkSync(path);
  }

  return {
    createImage,
    updateImage,
    deleteImage,
  };
}
