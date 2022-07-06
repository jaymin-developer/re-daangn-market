import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { GlobalContext } from "../../pages/_app";

import * as Login from "../../styles/login/Login.styles";

const LoginComponent = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { accessToken } = useContext(GlobalContext);

  const [loginUser] = useMutation(LOGIN_USER);

  const onChangeLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => {
      return { ...prev, [e.target.type]: e.target.value };
    });

    // 이메일 검증 후 에러 메세지
    if (e.target.type === "email" && /^\w+@\w+\.\w+$/.test(e.target.value)) {
      setEmailError("");
    }

    // 패스워드 검증 후 에러 메시지
    if (
      e.target.type === "password" &&
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        e.target.value
      )
    ) {
      setPasswordError("");
    }
  };

  const onClickLogin = async () => {
    try {
      await loginUser({
        variables: {
          email: loginInfo.email,
          password: loginInfo.password,
        },
      });
      if (/^\w+@\w+\.\w+$/.test(loginInfo.email) === false) {
        setEmailError("올바른 이메일 형식이 아닙니다.");
      }

      if (
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
          loginInfo.password
        ) === false
      ) {
        setPasswordError(
          "8~16자의 영문,숫자,특수 문자의 조합하여 작성해주세요."
        );
      }
      if (
        /^\w+@\w+\.\w+$/.test(loginInfo.email) &&
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
          loginInfo.password
        )
      ) {
        router.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: error.message });
        router.push("/login");
      }
    }
  };
  if (accessToken) {
    router.push("/market");
  }

  const onCheckEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <Login.WrapperDiv>
      <Login.LoginHeaderDiv>
        <Login.LogoImg src="/logo_daangn.png" />
      </Login.LoginHeaderDiv>
      <Login.LoginBodyDiv onKeyPress={onCheckEnter}>
        <Login.EmailInput
          type="email"
          placeholder="아이디"
          onChange={onChangeLoginInfo}
          value={loginInfo.email}
          required
        ></Login.EmailInput>
        <Login.ErrorMessageDiv id="email">{emailError}</Login.ErrorMessageDiv>
        <Login.PasswordInput
          type="password"
          placeholder="패스워드"
          onChange={onChangeLoginInfo}
          value={loginInfo.password}
          required
        ></Login.PasswordInput>
        <Login.ErrorMessageDiv id="password">
          {passwordError}
        </Login.ErrorMessageDiv>
        <Login.LoginButton onClick={onClickLogin}>로그인</Login.LoginButton>
      </Login.LoginBodyDiv>
    </Login.WrapperDiv>
  );
};

export default LoginComponent;
