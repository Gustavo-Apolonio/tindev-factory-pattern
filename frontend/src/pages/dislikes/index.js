import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../../components/header";
import DevCard from "../../components/devCard";

import avatar from "../../assets/images/defaultUser.svg";

import { CardsContainer, Empty } from "../main/styled.js";

import createAPI from "../../services/api.js";

const api = createAPI();

export default function Disliked(props) {
  const ref = props.loadingRef;

  const token = sessionStorage.getItem("@tindev/token");

  const navigation = useNavigate();

  const location = useLocation();
  const state = location.state;
  const dev = state.dev || {
    id: 0,
    name: "Developer FullStack",
    bio: null,
    avatar,
  };

  const [devs, setDevs] = useState([]);

  const loadDevs = useCallback(async () => {
    try {
      ref.current.continuousStart();
      const resp = await api.disliked(token);

      setDevs([...resp]);
      ref.current.complete();
    } catch (error) {
      ref.current.complete();
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

        default:
          toast.error(message, {
            theme: "dark",
          });
          break;
      }
    }
  }, [token, ref, navigation]);

  useEffect(() => {
    loadDevs();
  }, [token, loadDevs]);

  const handleUndislike = async (id, loading) => {
    try {
      loading(true);

      const resp = await api.undislike(token, id);

      setDevs(devs.filter((dev) => dev.id !== id));

      loading(false);

      toast.success("User returned to Tindev List!");

      return resp;
    } catch (error) {
      loading(false);

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
    <div>
      <Header dev={dev} page="disliked" />

      {devs.length > 0 ? (
        <CardsContainer>
          {devs.map((dev) => (
            <DevCard
              key={dev.id}
              dev={dev}
              devs={{ devs, setDevs }}
              token={token}
              show={{
                buttons: "disliked",
                like: {
                  show: true,
                  fn: handleUndislike,
                },
                dislike: {
                  show: false,
                  fn: null,
                },
              }}
            />
          ))}
        </CardsContainer>
      ) : (
        <Empty>You haven't disliked any dev yet... :)</Empty>
      )}
    </div>
  );
}
