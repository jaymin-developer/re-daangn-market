import styled from "@emotion/styled";

export const WrapperSection = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;

  margin-top: 64px;

  padding: 32px;
`;

export const HeaderH1 = styled.h1`
  font-size: 36px;
  font-weight: 700;
`;

export const SearchWriteDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const NoDataDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ListSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  gap: 48px;
`;
