import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/dev",
});

export default function createAPI() {
  async function enter(info) {
    const resp = await api.post("/app", info);
    return resp.data;
  }

  async function devs(token) {
    const resp = await api.get("/", { headers: { "x-access-token": token } });
    return resp.data;
  }

  async function like(token, targetId) {
    const resp = await api.post(
      `/like/${targetId}`,
      {},
      {
        headers: { "x-access-token": token },
      }
    );
    return resp.data;
  }

  async function unlike(token, targetId) {
    const resp = await api.put(
      `/like/remove/${targetId}`,
      {},
      { headers: { "x-access-token": token } }
    );
    return resp.data;
  }

  async function liked(token) {
    const resp = await api.get("/liked", {
      headers: { "x-access-token": token },
    });
    return resp.data;
  }

  async function dislike(token, targetId) {
    const resp = await api.post(
      `/dislike/${targetId}`,
      {},
      {
        headers: { "x-access-token": token },
      }
    );
    return resp.data;
  }

  async function undislike(token, targetId) {
    const resp = await api.put(
      `/dislike/remove/${targetId}`,
      {},
      { headers: { "x-access-token": token } }
    );
    return resp.data;
  }

  async function disliked(token) {
    const resp = await api.get("/disliked", {
      headers: { "x-access-token": token },
    });
    return resp.data;
  }

  async function updateProfilePic(token, avatar, last_avatar) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("last_avatar", last_avatar);

    const resp = await api.put("/profile/avatar", formData, {
      headers: {
        "x-access-token": token,
        "content-type": "multipart/form-data",
      },
    });
    return resp.data;
  }

  return {
    enter,
    devs,
    like,
    unlike,
    liked,
    dislike,
    undislike,
    disliked,

    updateProfilePic,
  };
}
