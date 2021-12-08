import DevModel from "../models/DevModel.js";

export default function createDevDatabase() {
  async function getDevById(id) {
    const resp = await DevModel.findById(id);
    return resp;
  }

  async function getDevs(dev) {
    const filters = {
      $and: [{ _id: { $ne: dev._id } }, { _id: { $nin: dev.likes } }],
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

  async function likeDev(loggedDev, targetDev) {
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return loggedDev;
  }

  async function dislikeDev(loggedDev, targetDev) {
    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return loggedDev;
  }

  return {
    getDevById,
    getDevs,
    getDevByUsername,
    createDev,
    likeDev,
    dislikeDev,
  };
}
