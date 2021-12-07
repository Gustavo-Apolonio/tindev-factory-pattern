export default function createLikeDatabase() {
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
    likeDev,
    dislikeDev,
  };
}
