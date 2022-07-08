import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { userInfo } from "os";
import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { useMoveToPage } from "../../hooks/useRouter";
import { GlobalContext } from "../../pages/_app";
import {
  FETCH_USER_LOGGED_IN,
  LOGOUT_USER,
} from "../../queries/layout/Header.queries";
import { IQuery } from "../../src/commons/types/generated/types";
import * as Header from "../../styles/layout/Header.styles";
import {
  FuncButtonSub,
  MoveButtonMain,
  MoveButtonSub,
} from "../common/Button.component";

const LayoutHeaderComponent = () => {
  const router = useRouter();
  const [clickMenu, setClickMenu] = useState(true);
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { moveToPage } = useMoveToPage();
  const { accessToken, setUserInfo, setSearch } = useContext(GlobalContext);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const onClickMenu = () => {
    setClickMenu(true);
    router.push("/market");
  };

  const onClickLogOut = () => {
    logoutUser();
    alert("로그아웃이 됐습니다.");
    window.location.reload();
  };

  const onKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      setSearch(target.value);
      router.push("/market");
    }
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("UserInfo", JSON.stringify(data.fetchUserLoggedIn));
    }
    if (localStorage.getItem("UserInfo")) {
      setUserInfo(data?.fetchUserLoggedIn || {});
    }
  }, []);

  return (
    <Header.WrapperHeader>
      <Header.WrapperBoxDiv>
        <Header.LogoImg src="/logo-basic.svg" onClick={moveToPage("/")} />
        <Header.MenuP onClick={onClickMenu} clickMenu={clickMenu}>
          중고거래
        </Header.MenuP>
        <Header.SearchBarSpan>
          <Header.SearchBarInput
            placeholder="물품을 검색해보세요"
            onKeyPress={onKeyEnter}
          />
        </Header.SearchBarSpan>
        {!accessToken && (
          <Header.WrapperRightDiv>
            <MoveButtonMain name="로그인" page="/login" />
            <MoveButtonSub name="회원가입" page="/signup" />
          </Header.WrapperRightDiv>
        )}
        {accessToken && (
          <Header.WrapperRightDiv>
            <MoveButtonMain name="마이페이지" page="/mypage" />
            <FuncButtonSub name="로그아웃" func={onClickLogOut} />
          </Header.WrapperRightDiv>
        )}
      </Header.WrapperBoxDiv>
    </Header.WrapperHeader>
  );
};

export default LayoutHeaderComponent;
