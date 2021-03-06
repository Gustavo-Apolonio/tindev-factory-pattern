import DevModel from "../models/DevModel.js";

export default function createDevDatabase() {
  async function getDevByUsername(username) {
    const resp = await DevModel.findOne({ user: username });
    return resp;
  }

  async function getDevByGitId(gitId) {
    const resp = await DevModel.findOne({ git_id: gitId });
    return resp;
  }

  async function createDev(dev) {
    const resp = await DevModel.create(dev);
    return resp;
  }

  async function getDevById(id) {
    const resp = await DevModel.findById(id);
    return resp;
  }

  async function setDevUsername(dev, username) {
    await DevModel.findOneAndUpdate({ _id: dev._id }, { user: username });

    dev = await getDevById(dev._id);

    return dev;
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

  async function updateDev(dev, infos) {
    const { name, password, bio } = infos;

    await DevModel.findOneAndUpdate(
      {
        _id: dev._id,
      },
      {
        name,
        password,
        bio,
      }
    );

    const resp = await getDevById(dev._id);

    return resp;
  }

  async function updateAvatar(dev, avatar) {
    await DevModel.findOneAndUpdate(
      {
        _id: dev._id,
      },
      {
        avatar,
      }
    );

    const resp = await getDevById(dev._id);

    return resp;
  }

  return {
    getDevByUsername,
    getDevByGitId,
    createDev,
    setDevUsername,
    getDevById,
    getDevs,
    getLikedDevs,
    getDislikedDevs,
    updateDev,
    updateAvatar,
  };
}
