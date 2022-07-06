import styled from "@emotion/styled";

export const WrapperSection = styled.section`
  max-width: 1440px;
  width: 100%;
  height: 100vh;

  position: relative;

  padding: 96px 160px 0px;
`;

export const HeaderH1 = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`;

export const SearchWriteDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: 20px 0px;
`;

export const NoDataDiv = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
`;

export const ListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  gap: 48px;
`;
