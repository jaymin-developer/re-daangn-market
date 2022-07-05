import styled from "@emotion/styled";
import { FontSize } from "../theme";

export const WrapperHeader = styled.header`
  width: 100%;
  height: 64px;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;

  position: fixed;

  gap: 10px;

  padding: 0 16px;

  background-color: #ffffff;

  z-index: 9999;
`;

export const LogoImg = styled.img`
  width: 100px;
  cursor: pointer;
`;

export const SearchBarSpan = styled.span`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: flex-end;
`;

export const SearchBarInput = styled.input`
  font-size: ${FontSize.ButtonLargeText};
  width: 50%;

  background-color: #f2f3f6;

  outline: none;

  border: none;
  border-radius: 8px;

  padding: 8px;
`;

export const WrapperRightDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
