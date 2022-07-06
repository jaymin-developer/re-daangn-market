import styled from "@emotion/styled";
import { Color, FontSize } from "../theme";

interface IPropsMenuDiv {
  clickMenu: boolean;
}

export const WrapperHeader = styled.header`
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: center;

  position: fixed;

  padding: 0 32px;

  background-color: #ffffff;

  z-index: 9999;
`;

export const WrapperBoxDiv = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 5fr 2fr;
  align-items: center;

  gap: 10px;
`;

export const LogoImg = styled.img`
  width: 100px;
  cursor: pointer;
`;

export const MenuP = styled.p`
  margin-top: 3px;

  font-size: 18px;
  font-weight: 500;

  color: ${(props: IPropsMenuDiv) =>
    props.clickMenu === true && `${Color.Main}`};

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
  width: 400px;

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
