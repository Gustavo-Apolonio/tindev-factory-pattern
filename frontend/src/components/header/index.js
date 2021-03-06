import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  Profile,
  Menu,
  ProfileArea,
  DevsMenuArea,
} from "./styled.js";

import logo from "../../assets/images/logo.svg";
import {
  IoIosLogOut,
  IoMdHeartDislike as Dislike,
  IoMdHeart as Like,
  IoIosClose as Close,
  IoIosCodeWorking as Code,
} from "react-icons/io";

export default function Header(props) {
  const navigation = useNavigate();

  const dev = props.dev;

  const { name, avatar: avatarDev } = dev;

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

  const profile = () => {
    navigation(`/tindev/${firstName}`, { state: { dev } });
  };

  const page = props.page;

  const [avatar, setAvatar] = useState(avatarDev);

  useEffect(() => {
    const avatarPreview = avatar.includes("public/profiles/images")
      ? `http://localhost:5000${avatar.substr(avatar.indexOf("/", 1))}`
      : avatar;

    setAvatar(avatarPreview);
  }, [avatar]);
  
  return (
    <Container>
      <Profile id="menu">
        <ProfileArea onClick={profile} className="profileArea">
          <img className="profile" src={avatar} alt="Profile" />
          <h2>{firstName}</h2>
        </ProfileArea>
        <h3>|</h3>
        <DevsMenuArea onClick={toggleActive}>
          <img src={logo} alt="TINDEV" />
        </DevsMenuArea>
        <Menu className="devsMenu" page={page}>
          <button onClick={toggleActive} className="myBtn closeToggle">
            <Close />
          </button>
          <Link to={`/tindev/${firstName}/likes`} state={{ dev }}>
            <Like />
            Devs
          </Link>
          <Link to={`/tindev/${firstName}/dislikes`} state={{ dev }}>
            <Dislike />
            Devs
          </Link>
          <Link to={`/tindev`} state={{ dev }}>
            <Code />
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
