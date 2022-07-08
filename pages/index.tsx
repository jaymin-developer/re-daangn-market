import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMoveToPage } from "../hooks/useRouter";
import * as Main from "../styles/Main.styles";

const MainPage: NextPage = () => {
  const { moveToPage } = useMoveToPage();

  return (
    <Main.WrapperDiv>
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
        <meta
          property="og:image"
          content="https://www.daangn.com/images/meta/home/daangn.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main.FirstMainSection>
        <Main.TitleBoxDiv>
          <Main.MainTitleH1>
            당신 근처의
            <br />
            당근마켓
          </Main.MainTitleH1>
          <Main.MainTextP>
            중고 거래부터 동네 정보까지, 이웃과 함께해요.
            <br />
            가깝고 따뜻한 당신의 근처를 만들어요.
          </Main.MainTextP>
        </Main.TitleBoxDiv>
        <Main.FirstPageImg srcSet="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp" />
      </Main.FirstMainSection>
      <Main.SecondMainSection>
        <Main.SecondPageImg srcSet="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-cc678e9a217b96f5cb459f7f0684f5ba67706f9889801618b8cf879fbc2c0ea7.webp " />
        <Main.TitleBoxDiv>
          <Main.MainTitleH1>
            우리 동네
            <br />
            중고 직거래 마켓
          </Main.MainTitleH1>
          <Main.MainTextP>
            동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
          </Main.MainTextP>
          <Main.ButtonBoxDiv>
            <Main.MainButton onClick={moveToPage("/market")}>
              인기매물 보기
            </Main.MainButton>
            <Link href={"https://www.daangn.com/trust"}>
              <Main.MainButton>믿을 수 있는 중고거래</Main.MainButton>
            </Link>
          </Main.ButtonBoxDiv>
        </Main.TitleBoxDiv>
      </Main.SecondMainSection>
      <Main.ThirdMainSection>
        <Main.TitleBoxDiv>
          <Main.MainTitleH1>
            이웃과 함께 하는
            <br />
            동네생활
          </Main.MainTitleH1>
          <Main.MainTextP>
            우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
          </Main.MainTextP>
        </Main.TitleBoxDiv>
        <Main.ThirdPageImg srcSet="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-2-91a2286453bdf82dea16a7f0ee4ceb9dd325eae0e5a2a9967ba72c344bf8f2fc.webp " />
      </Main.ThirdMainSection>
    </Main.WrapperDiv>
  );
};

export default MainPage;
