import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useMoveToPage } from "../../hooks/useRouter";
import { GlobalContext } from "../../pages/_app";
import { LOGOUT_USER } from "../../queries/layout/Header.queries";
import * as Header from "../../styles/layout/Header.styles";
import {
  FuncButtonSub,
  MoveButtonMain,
  MoveButtonSub,
} from "../common/Button.component";

const LayoutHeaderComponent = () => {
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { moveToPage } = useMoveToPage();
  const { accessToken } = useContext(GlobalContext);

  const onClickLogOut = () => {
    logoutUser();
    alert("로그아웃이 됐습니다.");
    window.location.reload();
  };

  return (
    <Header.WrapperHeader>
      <Header.LogoImg src="/logo-basic.svg" onClick={moveToPage("/")} />
      <Header.SearchBarSpan>
        <Header.SearchBarInput placeholder="물품을 검색해보세요" />
      </Header.SearchBarSpan>
      {!accessToken && (
        <Header.WrapperRightDiv>
          <MoveButtonMain name="로그인" page="/login" />
          <MoveButtonSub name="회원가입" page="/" />
        </Header.WrapperRightDiv>
      )}
      {accessToken && (
        <Header.WrapperRightDiv>
          <MoveButtonMain name="마이페이지" page="/mypage" />
          <FuncButtonSub name="로그아웃" func={onClickLogOut} />
        </Header.WrapperRightDiv>
      )}
    </Header.WrapperHeader>
  );
};

export default LayoutHeaderComponent;
