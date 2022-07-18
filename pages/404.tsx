import { MoveButtonMain } from "../components/common/Button.component";
import * as Error404 from "../src/styles/404.styles";

const Error404Page = () => {
  return (
    <Error404.WrapperDiv>
      <Error404.titleP>404 페이지를 찾을 수 없습니다.</Error404.titleP>
      <MoveButtonMain name="홈으로" page="/" />
    </Error404.WrapperDiv>
  );
};

export default Error404Page;
