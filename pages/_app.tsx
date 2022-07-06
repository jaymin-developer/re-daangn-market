import "../styles/reset.ts";
import "antd/dist/antd.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import type { AppProps } from "next/app";

import { onError } from "@apollo/client/link/error";
import LayoutComponent from "../components/layout";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getAccessToken } from "../src/commons/libraries/getAccessToken";
import { createUploadLink } from "apollo-upload-client";
import { Global } from "@emotion/react";
import { restStyles } from "../styles/reset";

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  userInfo?: object;
  setUserInfo?: Dispatch<SetStateAction<string | object>>;
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  setSearch: String,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [search, setSearch] = useState("");

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
    uri: "https://backend05.codebootcamp.co.kr/graphql",
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
