import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../pages/_app";
import { getAccessToken } from "../src/commons/libraries/getAccessToken";

export const useAuth =
  (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
    const { accessToken } = useContext(GlobalContext);
    const router = useRouter();

    useEffect(() => {
      async function getToken() {
        if (!accessToken) {
          const newAccessToken = await getAccessToken();
          if (!newAccessToken) {
            alert("로그인을 먼저 해주세요!!!");
            router.push("/login");
          }
        }
      }
      getToken();
    }, []);

    return <Component {...props} />;
  };
