import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CardsContainer, Empty } from "./styled";

import avatar from "../../assets/images/defaultUser.svg";

import Header from "../../components/header";

import DevCard from "../../components/devCard";

import Match from "../../components/match";

import { toast } from "react-toastify";

import io from "socket.io-client";
import createAPI from "../../services/api";

const api = createAPI();

export default function Main() {
  const navigation = useNavigate();
  const location = useLocation();
  const state = location.state;
  const dev = state.dev || {
    id: 0,
    name: "Developer FullStack",
    bio: null,
    avatar,
  };
  const devId = dev.id;

  const token = sessionStorage.getItem("@tindev/token");

  const [devs, setDevs] = useState([]);

  const loadDevs = useCallback(async () => {
    try {
      const resp = await api.devs(token);

      setDevs([...resp]);
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

        default:
          toast.error(message, {
            theme: "dark",
          });
          break;
      }
    }
  }, [token, navigation]);

  useEffect(() => {
    loadDevs();
  }, [token, loadDevs]);

  const [match, setMatch] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { devId: devId },
      transports: ["websocket"],
    });

    socket.on("match", (dev) => setMatch(dev));
  }, [devId]);

  return (
    <div>
      <Header dev={dev} />
      {devs.length > 0 ? (
        <CardsContainer>
          {devs.map((dev) => (
            <DevCard
              key={dev.id}
              dev={dev}
              devs={{ devs, setDevs }}
              token={token}
            />
          ))}
        </CardsContainer>
      ) : (
        <Empty>Você zerou o Tindev...</Empty>
      )}

      {match && <Match devMatched={match} setMatch={setMatch} />}
    </div>
  );
}
