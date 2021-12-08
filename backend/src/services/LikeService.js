import createLikeDatabase from "../databases/LikeDatabase.js";

export default function createLikeService() {
  const db = createLikeDatabase();

  function verify(loggedDev, targetDev) {
    if (loggedDev.likes.includes(targetDev._id))
      throw "You've already liked this user!";

    if (loggedDev.dislikes.includes(targetDev._id))
      throw "You've already disliked this user!";
  }

  async function likeDev(loggedDev, targetDev) {
    verify(loggedDev, targetDev);

    const resp = await db.likeDev(loggedDev, targetDev);
    return resp;
  }

  async function dislikeDev(loggedDev, targetDev) {
    verify(loggedDev, targetDev);

    const resp = await db.dislikeDev(loggedDev, targetDev);
    return resp;
  }

  return {
    likeDev,
    dislikeDev,
  };
}
