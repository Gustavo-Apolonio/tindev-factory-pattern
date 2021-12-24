import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import createAPI from "../../services/api.js";
import io from "socket.io-client";

import { CardsContainer, Empty } from "./styled.js";

import avatar from "../../assets/images/defaultUser.svg";

import Header from "../../components/header";
import DevCard from "../../components/devCard";
import Match from "../../components/match";

const api = createAPI();

export default function Main(props) {
  const ref = props.loadingRef;

  const token = sessionStorage.getItem("@tindev/token");

  const navigation = useNavigate();
  const location = useLocation();
  const state = location.state;
  const dev = state.dev || {
    id: 0,
    git_exists: true,
    name: "Developer FullStack",
    user: "FullStack-Dev",
    password: "000",
    bio: null,
    avatar,
  };
  const devId = dev.id;

  const [devs, setDevs] = useState([]);
  const [match, setMatch] = useState(null);

  const loadDevs = useCallback(async () => {
    try {
      ref.current.continuousStart();
      const resp = await api.devs(token);

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

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { devId: devId },
      transports: ["websocket"],
    });

    socket.on("match", (dev) => setMatch(dev));
    socket.on("newDev", (dev) => {
      let devsCopy = devs;
      devsCopy.push(dev.dev);
      setDevs([...devsCopy]);
    });
  }, [devId, devs]);

  return match ? (
    <div>
      {window.scrollTo(0, 0)}
      <Header dev={dev} page="main" />
      <Match devMatched={match} setMatch={setMatch} />
    </div>
  ) : (
    <div>
      <Header dev={dev} page="main" />
      {devs.length > 0 ? (
        <CardsContainer className="cards">
          {devs.map((dev) => (
            <DevCard
              key={dev.id}
              dev={dev}
              devs={{ devs, setDevs }}
              token={token}
              show={{
                buttons: "both",
                like: {
                  show: true,
                  fn: null,
                },
                dislike: {
                  show: true,
                  fn: null,
                },
              }}
            />
          ))}
        </CardsContainer>
      ) : (
        <Empty>You've cleaned tindev...</Empty>
      )}
    </div>
  );
}
