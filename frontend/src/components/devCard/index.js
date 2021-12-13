import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import createAPI from "../../services/api.js";

import { Container, Footer, Buttons, Button } from "./styled.js";

import { IoMdHeartDislike as Dislike, IoMdHeart as Like } from "react-icons/io";

const api = createAPI();

export default function DevCard(props) {
  const navigation = useNavigate();

  const dev = props.dev;
  const token = props.token;

  const devs = props.devs;

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
        <Button dislike type="button" onClick={() => handleDislike(dev.id)}>
          <Dislike />
        </Button>
        <Button like type="button" onClick={() => handleLike(dev.id)}>
          <Like />
        </Button>
      </Buttons>
    </Container>
  );
}
