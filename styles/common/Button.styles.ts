import styled from "@emotion/styled";
import { Color, FontSize } from "../theme";

export const BaseButton = styled.button`
  width: 120px;
  height: 40px;

  border-radius: 8px;
  font-size: ${FontSize.ButtonLargeText};
  font-weight: 700;
`;

export const Button1Button = styled(BaseButton)`
  color: ${Color.White};
  background-color: ${Color.Main};
`;

export const Button2Button = styled(BaseButton)`
  color: ${Color.Main};
  background-color: ${Color.White};
  border: 1px solid ${Color.Main};
`;
