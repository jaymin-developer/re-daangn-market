import styled from "@emotion/styled";
import { Color } from "../theme";

export const WrapperDiv = styled.div`
  width: 100%;
  max-width: 560px;

  height: calc(100vh - 96px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 96px 10px 0;

  gap: 20px;
`;

export const ProfileBoxDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileColumnBoxDiv = styled(ProfileBoxDiv)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 10px;
`;

export const ProfileImg = styled.img``;
export const ProfileNameP = styled.p`
  font-size: 18px;
  font-weight: 700;
`;
export const ProfileIdP = styled.p`
  font-size: 14px;
`;

export const MenuBoxDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;
`;

export const MenuItemBoxDiv = styled.div`
  width: 80px;
  height: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;

  background-color: #ffb88b;
  border-radius: 50%;

  cursor: pointer;

  svg {
    color: ${Color.Main};
  }
`;
