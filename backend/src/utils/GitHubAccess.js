import axios from "axios";

export default function createGitHubAccess() {
  function verifyUsername(username) {
    if (username === "") throw "Please, insert an username...";
  }

  async function getUser(username) {
    verifyUsername(username);

    try {
      const userInfo = await (
        await axios.get(`https://api.github.com/users/${username}`)
      ).data;
      const { name, login: user, bio, avatar_url: avatar } = userInfo;

      const resp = {
        name: name || user,
        user,
        bio,
        avatar,
      };

      return resp;
    } catch (error) {
      return null;
    }
  }

  return {
    getUser,
  };
}
