import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, Profile } from "./styled.js";

import logo from "../../assets/images/logo.svg";
import logoutIcon from "../../assets/images/logout.svg";

export default function Header(props) {
  const navigation = useNavigate();

  const { name, avatar } = props.dev;

  let firstName = name.includes(" ")
    ? name.substring(0, name.indexOf(" "))
    : name;

  const logout = () => {
    sessionStorage.clear();

    navigation("/");
  };

  return (
    <Container>
      <Profile>
        <img className="profile" src={avatar} alt="Profile" />
        <h2>{firstName}</h2> &nbsp; | &nbsp; <img src={logo} alt="TINDEV" />
      </Profile>

      <button type="button" onClick={() => logout()}>
        <img src={logoutIcon} alt="Logout" />
      </button>
    </Container>
  );
}
