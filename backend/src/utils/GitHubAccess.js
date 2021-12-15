import axios from "axios";

export default function createGitHubAccess() {
  async function getUser(username) {
    try {
      const userInfo = await (
        await axios.get(`https://api.github.com/users/${username}`)
      ).data;
      const { name, login: user, id, bio, avatar_url: avatar } = userInfo;

      const resp = {
        git_id: id.toString(),
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
