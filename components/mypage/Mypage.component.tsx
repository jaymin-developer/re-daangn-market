import { ShopOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../../src/api/mypage/Mypage.queries";
import * as MyPage from "../../src/styles/mypage/Mypage.styles";
import { IQuery } from "../../src/types/generated/types";

const MyPageComponent = () => {
  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const user = data?.fetchUserLoggedIn;

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
        </MyPage.ProfileColumnBoxDiv>
        <MyPage.ProfileNameP>{`>`}</MyPage.ProfileNameP>
      </MyPage.ProfileBoxDiv>
      <MyPage.MenuBoxDiv>
        <MyPage.MenuItemBoxDiv>
          <ShopOutlined style={{ fontSize: "30px" }} />
          <p>판매내역</p>
        </MyPage.MenuItemBoxDiv>
        <MyPage.MenuItemBoxDiv>
          <ShoppingOutlined style={{ fontSize: "30px" }} />
          <p>구매내역</p>
        </MyPage.MenuItemBoxDiv>
        <MyPage.MenuItemBoxDiv>
          <ShoppingCartOutlined style={{ fontSize: "30px" }} />
          <p>관심목록</p>
        </MyPage.MenuItemBoxDiv>
      </MyPage.MenuBoxDiv>
    </MyPage.WrapperDiv>
  );
};

export default MyPageComponent;
