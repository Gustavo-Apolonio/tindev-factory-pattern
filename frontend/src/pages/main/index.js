import React from "react";
import { useLocation } from "react-router-dom";

import avatar from "../../assets/images/defaultUser.svg";

import Header from "../../components/header";

export default function Main() {
  const location = useLocation();
  const state = location.state;
  const dev = state.dev || {
    id: 0,
    name: "Developer FullStack",
    bio: null,
    avatar,
  };

  return (
    <div>
      <Header dev={dev} />
    </div>
  );
}
