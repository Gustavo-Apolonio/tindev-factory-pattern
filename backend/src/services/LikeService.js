import createLikeDatabase from "../databases/LikeDatabase.js";

export default function createLikeService() {
  const db = createLikeDatabase();

  const verifies = {
    give(loggedDev, targetDev) {
      if (loggedDev.likes.includes(targetDev._id))
        throw "You've already liked this user!";

      if (loggedDev.dislikes.includes(targetDev._id))
        throw "You've already disliked this user!";
    },
    removeLike(loggedDev, targetDev) {
      if (!loggedDev.likes.includes(targetDev._id))
        throw "You've not liked this user yet!";
    },
    removeDislike(loggedDev, targetDev) {
      if (!loggedDev.dislikes.includes(targetDev._id))
        throw "You've not disliked this user yet!";
    },
    default() {
      throw "Internal error, I'm sorry about that!";
    },
  };

  function verify(loggedDev, targetDev, type = "default") {
    const verification = verifies[type];

    verification(loggedDev, targetDev);
  }

  async function likeDev(loggedDev, targetDev) {
    verify(loggedDev, targetDev, "give");

    const resp = await db.likeDev(loggedDev, targetDev);
    return resp;
  }

  async function unlikeDev(loggedDev, targetDev) {
    verify(loggedDev, targetDev, "removeLike");

    const resp = await db.unlikeDev(loggedDev, targetDev);
    return resp;
  }

  async function dislikeDev(loggedDev, targetDev) {
    verify(loggedDev, targetDev, "give");

    const resp = await db.dislikeDev(loggedDev, targetDev);
    return resp;
  }

  async function undislikeDev(loggedDev, targetDev) {
    verify(loggedDev, targetDev, "removeDislike");

    const resp = await db.undislikeDev(loggedDev, targetDev);
    return resp;
  }

  return {
    likeDev,
    unlikeDev,
    dislikeDev,
    undislikeDev,
  };
}
