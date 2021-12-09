import React from "react";

import itsamatch from "../../assets/images/itsamatch.png";

import { Container, Avatar } from "./styled.js";

export default function Match(props) {
  const dev = props.devMatched;
  const setMatch = props.setMatch;

  return (
    dev && (
      <Container>
        <img src={itsamatch} alt="Deu Match!" />
        <Avatar src={dev.avatar} alt={`Perfil de ${dev.name}`} />
        <strong>{dev.name}</strong>
        <p>{dev.bio}</p>
        <button onClick={() => setMatch(null)}>Fechar</button>
      </Container>
    )
  );
}
