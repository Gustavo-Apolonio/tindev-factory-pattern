import styled from "styled-components";

const CardsContainer = styled.div`
  width: calc(100% - 30px);

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;

  margin-top: calc(10vh - 10px);
  margin-bottom: calc(2.5vh - 10px);
  padding: 5px 15px;
`;

const Empty = styled.div`
  width: calc(100% - 30px);
  height: calc(100vh - (10vh + 10px));

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: calc(10vh - 10px);
  padding: 5px 15px;

  font-size: 32px;
  font-weight: bold;

  color: #999;
`;

export { CardsContainer, Empty };
