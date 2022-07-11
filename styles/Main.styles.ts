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

  padding: 0px 36px;
`;

export const FirstMainSection = styled(MainSection)`
  background-color: ${Color.MainBackGround};
`;

export const TitleBoxDiv = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export const MainTitleH1 = styled.h1`
  font-size: ${FontSize.MainTitle};
  font-weight: 700;

  line-height: 1.3;
  letter-spacing: -0.4px;
`;

export const MainTextP = styled.p`
  font-size: ${FontSize.MainText};

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
  background-color: ${Color.ButtonBackGround};
  font-weight: 700;

  padding: 16px 32px;
  border-radius: 6px;
`;

export const ThirdMainSection = styled(FirstMainSection)`
  background-color: ${Color.SubBackGround};
`;

export const ThirdPageImg = styled.img`
  width: 500px;
`;

export const ForthMainSection = styled(MainSection)`
  flex-direction: column;
  background-color: #f8f9fa;

  position: relative;
`;

export const TitleH1 = styled.h1`
  font-size: ${FontSize.MainTitle};
  font-weight: 700;
`;

export const ListSection = styled.section`
  max-width: 1440px;
  width: 100%;

  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr;

  gap: 48px;

  padding: 0px 160px 0px;
`;
