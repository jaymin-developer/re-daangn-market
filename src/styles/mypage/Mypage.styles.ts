import styled from "@emotion/styled";
import { Color } from "../theme";

export const WrapperDiv = styled.div`
  width: 100%;
  max-width: 560px;

  height: calc(100vh - 96px);

  display: flex;
  flex-direction: column;

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
  width: 60%;
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
  display: flex;
  font-size: 14px;

  gap: 10px;

  span {
    color: ${Color.Main};
    font-weight: 700;
    cursor: pointer;
  }
`;

export const MenuBoxDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;
`;

export const MenuItemBoxDiv = styled.div`
  width: 100px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;

  background-color: #ffb88b;
  border-radius: 50%;

  color: ${Color.Main};

  cursor: pointer;

  svg {
    color: ${Color.Main};
  }
`;

export const MenuSoldDiv = styled(MenuItemBoxDiv)`
  color: ${(props: { menu: string }) => props.menu === "sold" && "white"};
  svg {
    color: ${(props) => props.menu === "sold" && "white"};
  }
`;

export const MenuBuyDiv = styled(MenuItemBoxDiv)`
  color: ${(props: { menu: string }) => props.menu === "buy" && "white"};
  svg {
    color: ${(props) => props.menu === "buy" && "white"};
  }
`;

export const MenuPickDiv = styled(MenuItemBoxDiv)`
  color: ${(props: { menu: string }) => props.menu === "pick" && "white"};
  svg {
    color: ${(props) => props.menu === "pick" && "white"};
  }
`;
export const MenuChargeDiv = styled(MenuItemBoxDiv)`
  color: ${(props: { menu: string }) => props.menu === "charge" && "white"};
  svg {
    color: ${(props) => props.menu === "charge" && "white"};
  }
`;
