import React from "react";
import { useLocation } from "react-router-dom";

import { Container } from "./styled";

import avatar from "../../assets/images/defaultUser.svg";

import Header from "../../components/header";
import PictureSide from "../../components/profile/picture";
import Div from "../../components/div";
import InfoSide from "../../components/profile/info";

export default function Profile() {
  const token = sessionStorage.getItem("@tindev/token");

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

  return (
    <div>
      <Header dev={dev} page="profile" />
      <Container>
        <PictureSide />
        <Div />
        <InfoSide />
      </Container>
    </div>
  );
}
