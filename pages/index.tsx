import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ItemComponent from "../components/market/Item.component";
import { useMoveToPage } from "../hooks/useRouter";
import { FETCH_USED_ITEMS } from "../src/api/Home.queries";
import { IUseditem } from "../src/types/generated/types";
import * as Home from "../src/styles/Home.styles";

const HomePage: NextPage = () => {
  const { data } = useQuery(FETCH_USED_ITEMS);
  const { moveToPage } = useMoveToPage();

  return (
    <Home.WrapperDiv>
      <Head>
        <title>당신 근처의 당근마켓</title>
        <meta
          name="description"
          content="중고 거래부터 동네 정보까지, 이웃과 함께해요. 가깝고 따뜻한 당신의 근처를 만들어요."
        />
        <meta
          name="description"
          content="중고 거래부터 동네 정보까지, 이웃과 함께해요. 가깝고 따뜻한 당신의 근처를 만들어요."
        />
        <meta property="og:title" content="당신 근처의 당근마켓" />
        <meta
          property="og:description"
          content="중고 거래부터 동네 정보까지, 이웃과 함께해요. 가깝고 따뜻한 당신의 근처를 만들어요."
        />
        <meta property="og:image" content="https://www.daangn.com/images/meta/home/daangn.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home.FirstMainSection>
        <Home.TitleBoxDiv>
          <Home.MainTitleH1>
            당신 근처의
            <br />
            당근마켓
          </Home.MainTitleH1>
          <Home.MainTextP>
            중고 거래부터 동네 정보까지, 이웃과 함께해요.
            <br />
            가깝고 따뜻한 당신의 근처를 만들어요.
          </Home.MainTextP>
        </Home.TitleBoxDiv>
        <Home.FirstPageImg srcSet="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp" />
      </Home.FirstMainSection>
      <Home.SecondMainSection>
        <Home.SecondPageImg srcSet="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-cc678e9a217b96f5cb459f7f0684f5ba67706f9889801618b8cf879fbc2c0ea7.webp " />
        <Home.TitleBoxDiv>
          <Home.MainTitleH1>
            우리 동네
            <br />
            중고 직거래 마켓
          </Home.MainTitleH1>
          <Home.MainTextP>동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.</Home.MainTextP>
          <Home.ButtonBoxDiv>
            <Home.MainButton onClick={moveToPage("/market")}>인기매물 보기</Home.MainButton>
            <Link href={"https://www.daangn.com/trust"}>
              <Home.MainButton>믿을 수 있는 중고거래</Home.MainButton>
            </Link>
          </Home.ButtonBoxDiv>
        </Home.TitleBoxDiv>
      </Home.SecondMainSection>
      <Home.ThirdMainSection>
        <Home.TitleBoxDiv>
          <Home.MainTitleH1>
            이웃과 함께 하는
            <br />
            동네생활
          </Home.MainTitleH1>
          <Home.MainTextP>우리 동네의 다양한 이야기를 이웃과 함께 나누어요.</Home.MainTextP>
        </Home.TitleBoxDiv>
        <Home.ThirdPageImg srcSet="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-2-91a2286453bdf82dea16a7f0ee4ceb9dd325eae0e5a2a9967ba72c344bf8f2fc.webp " />
      </Home.ThirdMainSection>
      <Home.ForthMainSection>
        <Home.TitleH1>중고거래 최근매물</Home.TitleH1>
        <Home.ListSection>
          {data?.fetchUseditems.slice(0, 8).map((el: IUseditem) => (
            <ItemComponent el={el} />
          ))}
        </Home.ListSection>
      </Home.ForthMainSection>
    </Home.WrapperDiv>
  );
};

export default HomePage;
