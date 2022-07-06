import Head from "next/head";
import MarketComponent from "../../components/market/Market.component";

const MarketListPage = () => {
  return (
    <>
      <Head>
        <title>당근마켓 중고거래 | 당신 근처의 당근마켓</title>
        <meta
          name="description"
          content="당근마켓에서 거래되는 최신 중고 매물을 소개합니다. 지금 당근마켓에서 거래되고 있는 다양한 매물을 구경해보세요."
        ></meta>
        <meta
          property="og:url"
          content="https://www.daangn.com/hot_articles"
        ></meta>
        <meta
          property="og:title"
          content="당근마켓 중고거래 | 당신 근처의 당근마켓"
        ></meta>
        <meta
          property="og:description"
          content="당근마켓에서 거래되는 인기 중고 매물을 소개합니다. 지금 당근마켓에서 거래되고 있는 다양한 매물을 구경해보세요."
        ></meta>
        <meta
          property="og:image"
          content="https://www.daangn.com/images/meta/home/flea_market.png"
        ></meta>
      </Head>
      <MarketComponent />
    </>
  );
};

export default MarketListPage;
