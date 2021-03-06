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

  z-index: 1000;

  .myBtn {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;

    border: none;

    cursor: pointer;
  }

  button.logoutBtn {
    & svg:hover {
      cursor: pointer;
    }

    &:focus-visible {
      outline-offset: 0px;
      outline: none;
    }

    font-size: 30px;

    &:hover svg {
      transform: translateY(-1.5px);
      transition: all 0.7s;
    }

    &:hover {
      color: #df4723;
      transition: all 0.2s;
    }
  }
`;

const Profile = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  h3 {
    margin: 0px 5px;
  }

  &.active div.devsMenu {
    z-index: 10000;

    button.closeToggle {
      color: #ff1c46;
    }

    button.closeToggle:hover {
      color: #ff4a6b;
      transition: all 0.2s;
    }

    background-color: rgba(0, 0, 0, 0.6) !important;
    a {
      color: #df4723;
    }

    a:nth-child(3) {
      color: #fd2c7a;
    }

    a:nth-child(2) {
      color: #14e29a;
    }

    a:hover {
      text-decoration: underline;

      transition: all 0.2s;
    }

    a:nth-child(3):hover {
      color: #ff7255;
    }

    a:nth-child(2):hover {
      color: #58eed7;
    }

    @media (max-width: 415px) {
      background-color: rgba(0, 0, 0, 0.9) !important;
    }
  }
`;

const ProfileArea = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  cursor: pointer;

  img.profile {
    margin-right: 5px;

    height: 100%;

    border-radius: 100%;
    border: 1.5px solid #df4723;
  }
`;

const DevsMenuArea = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: ${(props) => (props.page === "profile" ? "14em" : "12em")};

  margin-left: 5px;

  transition: 0.5s;

  border-radius: 5px;

  z-index: -10000;

  a {
    color: transparent;
    transform: rotate(calc(-360deg / -8 * var(--i)));

    padding: 5px;

    font-size: 18px;

    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.5s;
  }

  button.closeToggle {
    font-size: 30px;
    color: rgba(0, 0, 0, 0);

    transition: all 0.5s;
  }

  a:nth-child(2) {
    display: ${(props) => (props.page === "liked" ? "none" : "block")};
  }

  a:nth-child(3) {
    display: ${(props) => (props.page === "disliked" ? "none" : "block")};
  }

  a:nth-child(4) {
    display: ${(props) => (props.page === "main" ? "none" : "block")};
    font-size: 24px;
  }

  @media (max-width: 415px) {
    position: absolute;

    left: -3px;

    height: 90%;
    width: 15em;
  }
`;

export { Container, Profile, ProfileArea, DevsMenuArea, Menu };
