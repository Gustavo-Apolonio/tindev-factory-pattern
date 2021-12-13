import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .loader {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    visibility: ${(props) => (props.load ? "visible" : "hidden")};
  }
`;

const Img = styled.img`
  width: 14em;
`;

const Form = styled.div`
  width: 15%;
  height: 25%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  input {
    width: 100%;
    height: 25%;

    border: 1px solid #ddd;
    border-radius: 5px;

    padding: 0px 5px;

    transition: all 1s;

    outline: #ddd;

    font-size: 14px;

    color: #444;

    &:focus-visible {
      outline-offset: 0px;
      outline: rgba(223, 71, 35, 0.7) auto 1px;
    }
  }

  button {
    width: calc(100% + 10px);
    height: 25%;

    padding: 0px 5px;

    border: 1px solid #ddd;
    border-radius: 5px;

    font-size: 16px;
    color: #ddd;

    background-color: #df4723;

    cursor: pointer;

    transition: all 0.2s;

    &:hover {
      transform: translateY(-1.5px);
    }

    &:focus-visible {
      outline-offset: 0px;
      outline: none;

      transform: translateY(-1.5px);
    }
  }

  @media (max-width: 540px) {
    width: 35%;
  }

  @media (max-width: 415px) {
    width: 45%;
  }

  @media (max-width: 375px) {
    width: 50%;
  }

  @media (max-width: 280px) {
    width: 65%;
  }
`;

export { Container, Img, Form };
