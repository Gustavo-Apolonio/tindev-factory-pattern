import DevModel from "../models/DevModel.js";

export default function createDevDatabase() {
  async function getDevById(id) {
    const resp = await DevModel.findById(id);
    return resp;
  }

  async function getDevs(dev) {
    const filters = {
      $and: [
        { _id: { $ne: dev._id } },
        { _id: { $nin: dev.likes } },
        { _id: { $nin: dev.dislikes } },
      ],
    };

    const resp = await DevModel.find(filters);
    return resp;
  }

  async function getLikedDevs(dev) {
    const filters = {
      $and: [
        { _id: { $ne: dev._id } },
        { _id: { $nin: dev.dislikes } },
        { _id: { $in: dev.likes } },
      ],
    };

    const resp = await DevModel.find(filters);
    return resp;
  }

  async function getDislikedDevs(dev) {
    const filters = {
      $and: [
        { _id: { $ne: dev._id } },
        { _id: { $nin: dev.likes } },
        { _id: { $in: dev.dislikes } },
      ],
    };

    const resp = await DevModel.find(filters);
    return resp;
  }

  async function getDevByUsername(username) {
    const resp = await DevModel.findOne({ user: username });
    return resp;
  }

  async function createDev(dev) {
    const resp = await DevModel.create(dev);
    return resp;
  }

  async function updateDev(dev, fields) {
    const { name, password, bio, avatar } = fields;

    const resp = await DevModel.findOneAndUpdate(
      { _id: dev._id },
      {
        name,
        password,
        bio,
        avatar,
      }
    );

    dev = await DevModel.findById(dev._id);

    return dev;
  }

  return {
    getDevById,
    getDevs,
    getLikedDevs,
    getDislikedDevs,
    getDevByUsername,
    createDev,
    updateDev,
  };
}
