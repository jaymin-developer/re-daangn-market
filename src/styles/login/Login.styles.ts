import styled from "@emotion/styled";
import { Color } from "../theme";

export const WrapperDiv = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 20%;
`;

export const LoginBoxDiv = styled.div`
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

export const LoginHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LogoImg = styled.img`
  margin-bottom: 20px;
`;

export const LoginBodyDiv = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;

  border: 1px solid ${Color.Main};
  border-radius: 20px;
`;
export const EmailInput = styled.input`
  width: 100%;
  max-width: 500px;

  height: 40px;

  padding: 5px 10px;

  font-size: 18px;

  border: 1px solid #d2d2d2;
  border-radius: 7px;
`;

export const ErrorMessageDiv = styled.div`
  width: 100%;
  font-size: 12px;
  color: red;
`;

export const PasswordInput = styled(EmailInput)``;

export const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  background-color: #ff8a3d;
  color: white;
  font-size: 18px;
  border-radius: 7px;
  :hover {
    cursor: pointer;
  }
`;
