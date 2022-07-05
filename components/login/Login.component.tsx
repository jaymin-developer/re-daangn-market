import * as Login from "../../styles/login/Login.styles";

const LoginComponent = () => {
  return (
    <Login.WrapperDiv>
      <Login.LoginHeader>
        <Login.Logo src="/images/logo-basic.svg" />
      </Login.LoginHeader>
      <Login.LoginBody onKeyPress={onCheckEnter}>
        <Login.Email
          type="email"
          placeholder="아이디"
          onChange={onChangeEmail}
          value={email}
          required
        ></Login.Email>
        <Login.ErrorMessage>{emailError}</Login.ErrorMessage>
        <Login.Password
          type="password"
          placeholder="패스워드"
          onChange={onChangePassword}
          value={password}
          required
        ></Login.Password>
        <Login.ErrorMessage>{passwordError}</Login.ErrorMessage>
        <Login.LoginButton onClick={onClickLogin}>로그인</Login.LoginButton>
      </Login.LoginBody>
      <Login.LoginFooter>
        <Login.FindEmail>아이디 찾기</Login.FindEmail>
        <Login.FindPassword>비밀번호 찾기</Login.FindPassword>
        <Login.SignUp onClick={onClickSignUp}>회원가입</Login.SignUp>
      </Login.LoginFooter>
    </Login.WrapperDiv>
  );
};

export default LoginComponent;
