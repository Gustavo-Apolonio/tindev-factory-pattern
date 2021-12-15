import multer from "multer";
import bcrypt from "bcrypt";

import path from "path";
import fs from "fs";
import util from "util";

const acceptableFormats = [
  "png",
  "jfif",
  "pjpeg",
  "jpeg",
  "pjp",
  "jpg",
  "svgz",
  "svg",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profiles/images/");
  },
  filename: function (req, file, cb) {
    const name = path.parse(file.originalname).name;
    const ext = path.parse(file.originalname).ext;

    let fileName = "default";

    if (acceptableFormats.includes(ext.replaceAll(".", ""))) {
      const cryptname = bcrypt
        .hashSync(name, 0)
        .replaceAll("/", "")
        .replaceAll(".", "");
      fileName = cryptname + ext;
    }

    cb(null, fileName);
  },
});

const parser = multer({ storage: storage });

export default function createImageStorage() {
  async function createImage(req, res) {
    const upload = util.promisify(parser.single("avatar"));

    await upload(req, res);

    const reqFile = req.file || {
      originalname: "",
      destination: "",
      filename: "",
    };

    const { originalname, destination, filename } = reqFile;

    if (filename === "default") {
      fs.unlinkSync(`${destination}${filename}`);

      throw "Unacceptable file format given...";
    }

    const file = {
      originalname,
      path: `${destination}${filename}`,
    };

    req.body.avatar = file;
  }

  async function updateImage(req, res) {
    await createImage(req, res);

    const { originalname: name } = req.body.avatar;

    if (name === "")
      throw "Please, insert an image to update your profile avatar...";

    const last_avatar = req.body.last_avatar || "";

    if (last_avatar === "") {
      fs.unlinkSync(req.body.avatar.path);

      throw "Please, insert a reference to the last avatar...";
    }

    if (!last_avatar.includes("https://")) deleteImage(req, last_avatar);
  }

  function deleteImage(req, path) {
    const addedNow = req.body.avatar.path;

    try {
      fs.unlinkSync(path);
    } catch (error) {
      fs.unlinkSync(addedNow);

      throw "Last avatar reference not exists...";
    }
  }

  return {
    createImage,
    updateImage,
    deleteImage,
  };
}
