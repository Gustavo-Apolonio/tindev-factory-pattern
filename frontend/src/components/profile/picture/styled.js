import styled from "styled-components";

const Container = styled.div`
  width: 48%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 75%;
`;

const ImagePreview = styled.div`
  height: 30em;
  width: 30em;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  border: 2.5px solid #df4723;
  border-radius: 50%;

  background-image: ${(props) => `url(${props.background})`};
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  overflow: hidden;

  margin-bottom: 1.5em;

  label {
    cursor: pointer;

    width: 75%;
    height: 15%;

    background-color: #df4723;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0.9;

    color: #fff;
  }

  #pic-selector {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`;

const SaveButtons = styled.div`
  width: 65%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  width: 100%;

  border: none;
  border-radius: 4px;

  background: #fff;

  box-shadow: ${(props) =>
    props.save
      ? "0px 2px 3px 0px rgba(20, 226, 154, 0.5)"
      : "0px 2px 3px 0px rgba(253, 44, 122, 0.5)"};

  cursor: pointer;

  &:hover {
    box-shadow: ${(props) =>
      props.save
        ? "0px 2px 3px 0px rgba(88, 238, 215, 0.5)"
        : "0px 2px 3px 0px rgba(255, 114, 85, 0.5)"};

    transition: all 0.2s;
  }

  &:hover p {
    cursor: pointer;

    transform: translateY(-2.5px);
    transition: all 0.2s;
  }
`;

const CommingSoon = styled.div`
  width: 100%;
  height: 25%;

  border: 2px solid #962f17;
  border-radius: 15px;

  background-color: #df4723;

  color: #fff;

  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export {
  Container,
  ImgContainer,
  ImagePreview,
  SaveButtons,
  Button,
  CommingSoon,
};
