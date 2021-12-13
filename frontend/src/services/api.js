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

  async function liked(token) {
    const resp = await api.get("/liked", {
      headers: { "x-access-token": token },
    });
    return resp.data;
  }

  async function disliked(token) {
    const resp = await api.get("/disliked", {
      headers: { "x-access-token": token },
    });
    return resp.data;
  }

  return {
    enter,
    devs,
    dislike,
    like,
    liked,
    disliked,
  };
}
