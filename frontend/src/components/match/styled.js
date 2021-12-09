import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  strong {
    font-size: 32px;
    color: #fff;
  }

  p {
    margin-top: 10px;
    font-size: 24px;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.8);
    max-width: 400px;
    text-overflow: ellipsis;
    text-align: justify;
  }

  button {
    border: 0;
    background: none;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    margin-top: 30px;
    cursor: pointer;
  }
`;

const Avatar = styled.img`
  width: 16em;
  height: 16em;
  border-radius: 50%;
  border: 5px solid #df4723;
  margin-top: 15px;
`;

export { Container, Avatar }
