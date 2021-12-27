import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - ((10vh - 5px) + (2.5vh - 5px)));
  width: calc(100% - 30px);

  margin-top: calc(10vh - 10px);
  margin-bottom: calc(2.5vh - 10px);
  padding: 5px 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
