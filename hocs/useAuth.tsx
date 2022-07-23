import { Modal } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../pages/_app";
import { getAccessToken } from "../src/commons/libraries/getAccessToken";

export const useAuth = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
  const { accessToken, setAccessToken } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    async function getToken() {
      if (!accessToken) {
        const newAccessToken = await getAccessToken();
        setAccessToken(newAccessToken);

        if (!newAccessToken) {
          Modal.error({ content: "로그인을 먼저 해주세요!" });
          router.push("/login");
        }
      }
    }

    getToken();
  }, []);

  return <Component {...props} />;
};
