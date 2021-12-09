import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  img.profile {
    max-width: 100%;
    border-radius: 5px 5px 0px 0px;

    border-left: 2px solid #df4723;
    border-top: 2px solid #df4723;
    border-right: 2px solid #df4723;
  }
`;

const Footer = styled.footer`
  flex: 1;
  background: #fff;
  border: 2px solid #df4723;
  border-top: none;
  padding: 15px 20px;
  text-align: left;
  border-radius: 0px 0px 5px 5px;

  strong {
    font-size: 16px;
    color: #333;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    color: #999;
    margin-top: 5px;
  }
`;

const Buttons = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  button {
    height: 50px;
    border: none;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);

    &:hover {
      box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.5);
      transition: all 0.2s;
    }

    &:hover img {
      transform: translateY(-2.5px);
      transition: all 0.2s;
    }
  }
`;

export { Container, Footer, Buttons }
