import styled from 'styled-components';

const CardsContainer = styled.div`
  width: calc(100% - 30px);

  padding: 5px 15px;
  margin-top: calc(10vh - 10px);
  margin-bottom: calc(2.5vh - 10px);

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;

const Empty = styled.div`
  width: calc(100% - 30px);
  height: calc(100vh - (10vh + 10px));

  padding: 5px 15px;
  margin-top: calc(10vh - 10px);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  color: #999;
  font-weight: bold;
`;

export { CardsContainer, Empty }
