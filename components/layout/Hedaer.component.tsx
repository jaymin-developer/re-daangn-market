import { useMoveToPage } from "../../hooks/useRouter";
import * as Header from "../../styles/layout/Header.styles";
import { Button1, Button2 } from "../common/Button.component";

const LayoutHeaderComponent = () => {
  const { moveToPage } = useMoveToPage();

  return (
    <Header.WrapperHeader>
      <Header.LogoImg src="/logo-basic.svg" onClick={moveToPage("/")} />
      <Header.SearchBarSpan>
        <Header.SearchBarInput placeholder="물품을 검색해보세요" />
      </Header.SearchBarSpan>
      <Header.WrapperRightDiv>
        <Button1 name="로그인" page="/login" />
        <Button2 name="회원가입" page="/" />
      </Header.WrapperRightDiv>
    </Header.WrapperHeader>
  );
};

export default LayoutHeaderComponent;
