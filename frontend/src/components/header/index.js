import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container, Profile, Menu } from "./styled.js";

import logo from "../../assets/images/logo.svg";
import {
  IoIosLogOut,
  IoMdHeartDislike as Dislike,
  IoMdHeart as Like,
  IoIosClose as Close,
} from "react-icons/io";

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

  const toggleActive = () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
  };

  return (
    <Container>
      <Profile id="menu">
        <img className="profile" src={avatar} alt="Profile" />
        <button className="myBtn toggle" onClick={toggleActive}></button>
        <h2>{firstName}</h2> &nbsp; | &nbsp; <img src={logo} alt="TINDEV" />
        <Menu>
          <button onClick={toggleActive} className="myBtn closeToggle">
            <Close />
          </button>
          <Link to={`/tindev/${firstName}/likes`}>
            <Like />
            Devs
          </Link>
          <Link to={`/tindev/${firstName}/dislikes`}>
            <Dislike />
            Devs
          </Link>
        </Menu>
      </Profile>

      <button
        type="button"
        className="myBtn logoutBtn"
        onClick={() => logout()}
      >
        <IoIosLogOut />
      </button>
    </Container>
  );
}
