import "../src/styles/reset.ts";
import "antd/dist/antd.css";
import "moment/locale/ko";
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from "@apollo/client";
import type { AppProps } from "next/app";

import { onError } from "@apollo/client/link/error";
import LayoutComponent from "../components/layout";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAccessToken } from "../src/commons/libraries/getAccessToken";
import { createUploadLink } from "apollo-upload-client";
import { Global } from "@emotion/react";
import { restStyles } from "../src/styles/reset";

interface IUserInfo {
  _id?: string;
  name?: string;
  email?: string;
}

interface IGlobalContext {
  accessToken?: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  userInfo?: IUserInfo;
  setUserInfo: Dispatch<SetStateAction<IUserInfo>>;
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  setSearch: String,
  setUserInfo: Object,
  setAccessToken: String,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const [search, setSearch] = useState<string>("");

  const value = {
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
    search,
    setSearch,
  };

  useEffect(() => {
    getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          getAccessToken().then((newAccessToken) => {
            setAccessToken(newAccessToken);
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return forward(operation);
          });
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend07.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return (
    <GlobalContext.Provider value={value}>
      <ApolloProvider client={client}>
        <Global styles={restStyles} />
        <LayoutComponent>
          <Component {...pageProps} />;
        </LayoutComponent>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
