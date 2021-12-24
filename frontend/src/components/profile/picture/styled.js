import styled from "styled-components";

const Container = styled.div`
  width: 48%;
  height: 100%;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 50%;
`;

const ImagePreview = styled.div`
  height: 23em;
  width: 23em;

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

    width: 100%;
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
  width: 95%;

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

export { Container, ImgContainer, ImagePreview, SaveButtons, Button };
