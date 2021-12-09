import React from "react";

import { Container, Footer, Buttons } from "./styled";

import dislike from "../../assets/images/dislike.svg";
import like from "../../assets/images/like.svg";

import createAPI from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const api = createAPI();

export default function DevCard(props) {
  const dev = props.dev;
    const token = props.token;
    
    const devs = props.devs

  const navigation = useNavigate();

  const handleDislike = async (id) => {
    try {
      const resp = await api.dislike(token, id);

      devs.setDevs(devs.devs.filter((dev) => dev.id !== id));

      return resp;
    } catch (error) {
      const err = error.response || {
        data: { code: 0, message: "An occurred, try again later..." },
      };

      const code = err.data.code || 0;
      const message = err.data.message;

      switch (code) {
        case 401:
          toast.warn(message);
          toast.info("Logging you out...");

          sessionStorage.clear();

          navigation("/");
          break;

        case 400:
          toast.warn(message);
          break;

        default:
          toast.error(message, {
            theme: "dark",
          });
          break;
      }
    }
  };

  const handleLike = async (id) => {
    try {
      const resp = await api.like(token, id);

      devs.setDevs(devs.devs.filter((dev) => dev.id !== id));

      return resp;
    } catch (error) {
      const err = error.response || {
        data: { code: 0, message: "An occurred, try again later..." },
      };

      const code = err.data.code || 0;
      const message = err.data.message;

      switch (code) {
        case 401:
          toast.warn(message);
          toast.info("Logging you out...");

          sessionStorage.clear();

          navigation("/");
          break;

        case 400:
          toast.warn(message);
          break;

        default:
          toast.error(message, {
            theme: "dark",
          });
          break;
      }
    }
  };

  return (
    <Container>
      <img className="profile" src={dev.avatar} alt={`${dev.name}'s Profile`} />
      <Footer>
        <strong>{dev.name}</strong>
        <p>{dev.bio}</p>
      </Footer>

      <Buttons>
        <button type="button" onClick={() => handleDislike(dev.id)}>
          <img src={dislike} alt="Dislike" />
        </button>
        <button type="button" onClick={() => handleLike(dev.id)}>
          <img src={like} alt="Like" />
        </button>
      </Buttons>
    </Container>
  );
}
