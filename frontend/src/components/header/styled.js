import styled from "styled-components";

const Container = styled.div`
  width: calc(100% - 10px);
  height: calc(7.5vh - 10px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 5px;

  background-color: #bbb;

  position: fixed;

  top: 0;

  button {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;

    border: none;

    & img:hover {
      cursor: pointer;
    }

    & img {
      height: 100%;
      width: 100%;
    }

    &:focus-visible {
      outline-offset: 0px;
      outline: none;
    }
  }
`;

const Profile = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  img.profile {
    margin-right: 5px;

    height: 100%;

    border-radius: 100%;
    border: 1.5px solid #df4723;
  }
`;

export { Container, Profile };
