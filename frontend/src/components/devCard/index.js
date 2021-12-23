import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BounceLoader from "react-spinners/BounceLoader";

import createAPI from "../../services/api.js";

import { Container, Footer, Buttons, Button } from "./styled.js";

import { IoMdHeartDislike as Dislike, IoMdHeart as Like } from "react-icons/io";

const api = createAPI();

export default function DevCard(props) {
  const navigation = useNavigate();

  const dev = props.dev;
  const token = props.token;

  const devs = props.devs;

  const show = props.show;

  const display = show.buttons;
  const like = show.like;
  const dislike = show.dislike;

  const [loading, setLoading] = useState(false);

  const dislikeFn = async (id) => {
    if (display !== "both") return false;

    try {
      setLoading(true);
      const resp = await api.dislike(token, id);

      devs.setDevs(devs.devs.filter((dev) => dev.id !== id));

      setLoading(false);
      return resp;
    } catch (error) {
      setLoading(false);
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

  const likeFn = async (id) => {
    if (display !== "both") return false;

    try {
      setLoading(true);
      const resp = await api.like(token, id);

      devs.setDevs(devs.devs.filter((dev) => dev.id !== id));

      setLoading(false);
      return resp;
    } catch (error) {
      setLoading(false);
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

  const handleLike = like.fn ?? likeFn;
  const handleDislike = dislike.fn ?? dislikeFn;

  return (
    <Container show={display}>
      <img
        className="profile"
        src={dev.avatar}
        alt={`${dev.name}'s Profile`}
        onDoubleClick={() => handleLike(dev.id, setLoading)}
      />
      <BounceLoader color="#df4723" loading={loading} />
      <Footer
        show={display}
        onDoubleClick={() => handleLike(dev.id, setLoading)}
      >
        <strong>{dev.name}</strong>
        <p>{dev.bio}</p>
      </Footer>

      <Buttons show={display}>
        <Button
          dislike
          type="button"
          onClick={() => handleDislike(dev.id, setLoading)}
          show={dislike.show}
        >
          <Dislike />
        </Button>
        <Button
          like
          type="button"
          onClick={() => handleLike(dev.id, setLoading)}
          show={like.show}
        >
          <Like />
        </Button>
      </Buttons>
    </Container>
  );
}
