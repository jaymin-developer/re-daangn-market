import styled from "@emotion/styled";
import { useState } from "react";
import MarketDetailComponent from "../../../components/market/detail/MarketDetail.component";
import QuestionListComponent from "../../../components/market/detail/QuestionList.component";
import QuestionWriteComponent from "../../../components/market/detail/QuestionWrite.component";

const MarketDetailPage = () => {
  const [_, setEdit] = useState(false);

  return (
    <Wrapper>
      <MarketDetailComponent />
      <QuestionWriteComponent setEdit={setEdit} />
      <QuestionListComponent />
    </Wrapper>
  );
};

export default MarketDetailPage;

const Wrapper = styled.div`
  width: 100%;

  padding: 96px calc((100% - 644px) / 2);

  display: flex;
  flex-direction: column;
`;
