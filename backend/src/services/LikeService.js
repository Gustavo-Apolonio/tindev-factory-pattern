import createLikeDatabase from "../databases/LikeDatabase.js";

export default function createLikeService() {
  const db = createLikeDatabase();

  async function likeDev(loggedDev, targetDev) {
    const resp = await db.likeDev(loggedDev, targetDev);
    return resp;
  }

  async function dislikeDev(loggedDev, targetDev) {
    const resp = await db.dislikeDev(loggedDev, targetDev);
    return resp;
  }

  return {
    likeDev,
    dislikeDev,
  };
}
