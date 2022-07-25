import Head from "next/head";
import MyPageComponent from "../../components/mypage/Mypage.component";

const MyPagePage = () => {
  return (
    <>
      <Head>
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
        <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
      </Head>
      <MyPageComponent />
    </>
  );
};

export default MyPagePage;
