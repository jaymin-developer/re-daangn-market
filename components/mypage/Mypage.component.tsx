import { ShopFilled, ShoppingCartOutlined, ShoppingFilled, WalletFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import Head from "next/head";
import { ChangeEvent, MouseEvent, useState } from "react";
import { CREATE_POINT_TRANSACTION_OF_LOADING, FETCH_USER_LOGGED_IN } from "../../src/api/mypage/Mypage.queries";
import * as MyPage from "../../src/styles/mypage/Mypage.styles";
import { IQuery } from "../../src/types/generated/types";
import MyPageBuyComponent from "./MypageBuy.component";
import MyPagePickComponent from "./MypagePick.component";
import MyPageSellComponent from "./MypageSold.component";

declare global {
  interface Window {
    IMP: any;
  }
}

const MyPageComponent = () => {
  const [menu, setMenu] = useState("sold");
  const [amount, setAmount] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const [createPointTransactionOfLoading] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING, {
    variables: { impUid: "imp86575384" },
  });

  const { data, refetch } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const user = data?.fetchUserLoggedIn;

  const onChangeAmount = (e: ChangeEvent<HTMLSelectElement>) => {
    setAmount(Number(e.target.value));
  };

  const onClickMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element) {
      setMenu(e.currentTarget.id);
    }
  };

  const onClickModal = () => {
    setIsModal((prev) => !prev);
  };

  const onClickChargePoint = async (rsp: { success: boolean; imp_uid: string }) => {
    try {
      await createPointTransactionOfLoading({
        variables: {
          impUid: rsp.imp_uid,
        },
      });
      refetch();
      Modal.success({ content: `포인트 충전이 완료되었습니다.` });
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onClickPayment = () => {
    const IMP = window.IMP;
    IMP.init("imp49910675");
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        name: "포인트 충전",
        amount,
        buyer_email: data?.fetchUserLoggedIn?.email,
        buyer_name: data?.fetchUserLoggedIn?.name,
        // m_redirect_url: ,  << 모바일 웹에서 결제 후 돌아갈 주소
      },
      (rsp: { success: boolean; imp_uid: string }) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          // 포인트 충전시 이 곳에서 BE로 정보를 넘겨주는 로직을 작성해야함 ( imp_uid , paid_amount ) 즉, Mutation 실행 (createPointTransactionOfLoading)
          onClickChargePoint(rsp);
          onClickModal();
        } else {
          Modal.error({ content: "결제에 실패했습니다." });
          // 결제 실패 시 로직,
        }
      }
    );
  };

  return (
    <>
      <MyPage.WrapperDiv>
        <MyPage.ProfileBoxDiv>
          <MyPage.ProfileImg
            width={100}
            src={`https://storage.googleapis.com/${user?.picture}`}
            onError={(e) => {
              e.currentTarget.src = "/logo_daangn.png";
            }}
          />
          <MyPage.ProfileColumnBoxDiv>
            <MyPage.ProfileNameP>{user?.name}</MyPage.ProfileNameP>
            <MyPage.ProfileIdP>{user?._id}</MyPage.ProfileIdP>
            <MyPage.ProfileIdP>
              {user?.userPoint?.amount} 포인트 <span onClick={onClickModal}>충전하기</span>
            </MyPage.ProfileIdP>
          </MyPage.ProfileColumnBoxDiv>
          <MyPage.ProfileIdP>{`개인정보 수정 >`}</MyPage.ProfileIdP>
        </MyPage.ProfileBoxDiv>
        <MyPage.MenuBoxDiv>
          <MyPage.MenuSoldDiv id="sold" menu={menu} onClick={onClickMenu}>
            <ShopFilled style={{ fontSize: "30px" }} />
            <p>판매내역</p>
          </MyPage.MenuSoldDiv>
          <MyPage.MenuBuyDiv id="buy" menu={menu} onClick={onClickMenu}>
            <ShoppingFilled style={{ fontSize: "30px" }} />
            <p>구매내역</p>
          </MyPage.MenuBuyDiv>
          <MyPage.MenuPickDiv id="pick" menu={menu} onClick={onClickMenu}>
            <ShoppingCartOutlined style={{ fontSize: "30px" }} />
            <p>관심목록</p>
          </MyPage.MenuPickDiv>
        </MyPage.MenuBoxDiv>
        {menu === "sold" && <MyPageSellComponent />}
        {menu === "buy" && <MyPageBuyComponent />}
        {menu === "pick" && <MyPagePickComponent />}
      </MyPage.WrapperDiv>

      {/* 포인트 충전 모달 */}
      {isModal && (
        <Modal
          visible={true}
          onOk={onClickPayment}
          onCancel={onClickModal}
          okText="충전하기"
          cancelText="취소하기"
          style={{ textAlign: "center", width: "100%" }}
        >
          <h1>🥕 당근 포인트 충전</h1>
          <select onChange={onChangeAmount} style={{ width: "80%", textAlign: "center", fontSize: "18px" }}>
            <option selected disabled>
              충전 금액을 선택해주세요.
            </option>
            <option value="500">500 포인트</option>
            <option value="1000">1000 포인트</option>
            <option value="2000">2000 포인트</option>
            <option value="3000">3000 포인트</option>
          </select>
        </Modal>
      )}
    </>
  );
};

export default MyPageComponent;
