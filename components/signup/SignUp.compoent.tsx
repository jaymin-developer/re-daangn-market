import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import * as SignUp from "../../styles/signup/SignUp.styles";
import { CREATE_USER } from "../../types/signup/SignUp.types";
import { FuncButtonMain } from "../common/Button.component";

const SignUpComponent = () => {
  const router = useRouter();
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState(
    "8~16자의 영문,숫자,특수 문자의 조합하여 작성해주세요."
  );
  const [checkPasswordError, setCheckPasswordError] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const onChangeLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });

    // 이름 검증 후 에러 메세지
    e.target.id === "name" && e.target.value !== "" && setNameError("");

    // 이메일 검증 후 에러 메세지
    e.target.id === "email" &&
      /^\w+@\w+\.\w+$/.test(e.target.value) &&
      setEmailError("");

    // 패스워드 검증 후 에러 메시지
    e.target.id === "password" &&
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        e.target.value
      ) &&
      setPasswordError("");

    e.target.id === "checkPassword" &&
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        e.target.value
      ) &&
      e.target.value === signUpInfo.password &&
      setPasswordError("");
  };

  async function onClickSignUp() {
    if (/^\w+@\w+\.\w+$/.test(signUpInfo.email) === false) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    }

    if (signUpInfo.name === "") {
      setNameError("이름을 입력해주세요.");
    }

    if (
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        signUpInfo.password
      ) === false
    ) {
      setPasswordError("8~16자의 영문,숫자,특수 문자의 조합하여 작성해주세요.");
    }

    signUpInfo.checkPassword !== signUpInfo.password &&
      setCheckPasswordError("비밀번호와 일치하지 않습니다.");

    if (
      signUpInfo.name &&
      signUpInfo.password &&
      signUpInfo.checkPassword === signUpInfo.password &&
      /^\w+@\w+\.\w+$/.test(signUpInfo.email) &&
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        signUpInfo.password
      )
    ) {
      try {
        await createUser({
          variables: {
            createUserInput: {
              name: signUpInfo.name,
              email: signUpInfo.email,
              password: signUpInfo.password,
            },
          },
        });
        Modal.info({ content: "회원가입이 되었습니다. 로그인을 해주세요." });
        // alert("회원가입이 되었습니다. 로그인을 해주세요.")
        router.push(`/login`);
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }
  }

  return (
    <SignUp.WrapperDiv>
      <SignUp.InfoBoxDiv>
        <SignUp.LogoImg src="/logo-basic.svg" />

        <SignUp.EmailInput
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          onChange={onChangeLoginInfo}
          required
        ></SignUp.EmailInput>
        <SignUp.ErrorDiv>{emailError}</SignUp.ErrorDiv>
        <SignUp.NameInput
          id="name"
          type="text"
          placeholder="이름을 입력해주세요."
          onChange={onChangeLoginInfo}
          required
        />
        <SignUp.ErrorDiv>{nameError}</SignUp.ErrorDiv>
        <SignUp.PasswordInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={onChangeLoginInfo}
          required
        ></SignUp.PasswordInput>
        <SignUp.ErrorDiv>{passwordError}</SignUp.ErrorDiv>
        <SignUp.CheckPasswordInput
          id="checkPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          onChange={onChangeLoginInfo}
          required
        ></SignUp.CheckPasswordInput>
        <SignUp.ErrorDiv>{checkPasswordError}</SignUp.ErrorDiv>
        <FuncButtonMain name="가입하기" func={onClickSignUp} />
      </SignUp.InfoBoxDiv>
    </SignUp.WrapperDiv>
  );
};

export default SignUpComponent;
