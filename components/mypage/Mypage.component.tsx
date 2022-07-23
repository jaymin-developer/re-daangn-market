import { ShopFilled, ShoppingCartOutlined, ShoppingFilled, WalletFilled } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";
import { FETCH_USER_LOGGED_IN } from "../../src/api/mypage/Mypage.queries";
import * as MyPage from "../../src/styles/mypage/Mypage.styles";
import { IQuery } from "../../src/types/generated/types";
import MyPageBuyComponent from "./MypageBuy.component";
import MyPagePickComponent from "./MypagePick.component";
import MyPageSellComponent from "./MypageSold.component";

const MyPageComponent = () => {
  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const user = data?.fetchUserLoggedIn;
  const [menu, setMenu] = useState("sold");

  const onClickMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element) {
      setMenu(e.currentTarget.id);
    }
  };

  return (
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
            {user?.userPoint?.amount} 포인트 <span>충전하기</span>
          </MyPage.ProfileIdP>
        </MyPage.ProfileColumnBoxDiv>
        <MyPage.ProfileNameP>{`>`}</MyPage.ProfileNameP>
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
        <MyPage.MenuChargeDiv id="charge" menu={menu} onClick={onClickMenu}>
          <WalletFilled style={{ fontSize: "30px" }} />
          <p>충전하기</p>
        </MyPage.MenuChargeDiv>
      </MyPage.MenuBoxDiv>
      {menu === "sold" && <MyPageSellComponent />}
      {menu === "buy" && <MyPageBuyComponent />}
      {menu === "pick" && <MyPagePickComponent />}
    </MyPage.WrapperDiv>
  );
};

export default MyPageComponent;
