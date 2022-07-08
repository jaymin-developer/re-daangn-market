import styled from "@emotion/styled";
import { Color } from "../theme";

export const WrapperDiv = styled.div`
  width: 100%;
  height: calc(100vh - 96px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 96px 10px 0;
`;

export const InfoBoxDiv = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 20px 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid ${Color.Main};
  border-radius: 20px;

  gap: 10px;
`;

export const LogoImg = styled.img`
  margin-bottom: 10px;
`;

export const InfoInput = styled.input`
  width: 100%;
  max-width: 500px;

  padding: 10px;
  border: 1px solid #d2d2d2;
  border-radius: 10px;
`;

export const EmailInput = styled(InfoInput)``;

export const NameInput = styled(InfoInput)``;

export const PasswordInput = styled(InfoInput)``;

export const CheckPasswordInput = styled(InfoInput)``;

export const ErrorDiv = styled.div`
  color: red;
`;
