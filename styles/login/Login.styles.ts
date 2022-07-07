import styled from "@emotion/styled";

export const WrapperDiv = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 20%;
`;

export const LoginHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LogoImg = styled.img`
  width: 70px;
`;

export const LoginBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-width: 1000px;
`;
export const EmailInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px solid;
  border-radius: 7px;
`;

export const ErrorMessageDiv = styled.div`
  width: 100%;
  font-size: 12px;
  color: red;
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px solid;
  border-radius: 7px;
`;

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
