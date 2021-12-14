export default function createLikeDatabase() {
  async function likeDev(loggedDev, targetDev) {
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return loggedDev;
  }

  async function unlikeDev(loggedDev, targetDev) {
    const index = loggedDev.likes.indexOf(targetDev._id);

    loggedDev.likes.splice(index, 1);

    await loggedDev.save();

    return loggedDev;
  }

  async function dislikeDev(loggedDev, targetDev) {
    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return loggedDev;
  }

  async function undislikeDev(loggedDev, targetDev) {
    const index = loggedDev.dislikes.indexOf(targetDev._id);

    loggedDev.dislikes.splice(index, 1);

    await loggedDev.save();

    return loggedDev;
  }

  return {
    likeDev,
    unlikeDev,
    dislikeDev,
    undislikeDev,
  };
}
