import React from "react";
import { hot } from "react-hot-loader/root";
import { useToken } from "./hooks/useToken";
import './main.global.scss';
import { CardsList } from "./shared/CardsList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";
import { tokenContext } from "./shared/context/tokenContext";
import { UserContextProvider } from "./shared/context/userContext";
import { useBestPostsData } from "./hooks/useBestPostsData";
import { bestPostsContext } from "./shared/context/bestPostsContext";
import { Provider, useDispatch } from "react-redux";
import { rootReducer, SET_TOKEN } from "./store";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({reducer: rootReducer})

function AppComponent() {

  // const [token] = useToken();
  const dispatch = useDispatch();
  dispatch(SET_TOKEN(useToken()));
  const [postsData] = useBestPostsData();

  return (
    <Provider store={store}>
      {/* <tokenContext.Provider value={token}> */}
        <UserContextProvider>
          <bestPostsContext.Provider value={postsData}>
            <Layout>
              <Header />
              <Content>
                <CardsList />
              </Content>
            </Layout>
          </bestPostsContext.Provider>
        </UserContextProvider>
      {/* </tokenContext.Provider> */}
    </Provider>
  )
}

export const App = hot(() => <AppComponent />);
