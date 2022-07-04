import styled from "@emotion/styled";
import { Color, FontSize } from "./theme";

export const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainSection = styled.section`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const FirstMainSection = styled(MainSection)`
  background-color: ${Color.mainBackGround};
`;

export const TitleBoxDiv = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export const MainTitleH1 = styled.h1`
  font-size: ${FontSize.mainTitle};
  font-weight: 700;

  line-height: 1.3;
  letter-spacing: -0.4px;
`;

export const MainTextP = styled.p`
  font-size: ${FontSize.mainText};

  line-height: 1.5;
  letter-spacing: -0.3px;
`;

export const FirstPageImg = styled.img`
  transform: translateY(13vh);
  width: 600px;

  background-repeat: no-repeat;
`;

export const SecondMainSection = styled(MainSection)`
  background-color: #ffffff;
`;

export const SecondPageImg = styled.img`
  width: 500px;

  background-repeat: no-repeat;
`;

export const ButtonBoxDiv = styled.div`
  display: flex;

  gap: 10px;
`;

export const MainButton = styled.button`
  background-color: ${Color.buttonBackGround};
  font-weight: 700;

  padding: 16px 32px;
  border-radius: 6px;
`;

export const ThirdMainSection = styled(FirstMainSection)`
  background-color: ${Color.subBackGround};
`;

export const ThirdPageImg = styled.img`
  width: 500px;
`;
