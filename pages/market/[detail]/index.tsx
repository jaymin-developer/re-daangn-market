import styled from "@emotion/styled";
import MarketDetailComponent from "../../../components/market/detail/MarketDetail.component";
import QuestionWriteComponent from "../../../components/market/detail/QuestionWrite.component";

const MarketDetailPage = () => {
  return (
    <Wrapper>
      <MarketDetailComponent />
      <QuestionWriteComponent />
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
