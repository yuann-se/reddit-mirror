import React from "react";
import { hot } from "react-hot-loader/root";
import './main.global.scss';
import { CardsList } from "./shared/CardsList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";
import { useBestPostsData } from "./hooks/useBestPostsData";
import { bestPostsContext } from "./shared/context/bestPostsContext";
import { Provider } from "react-redux";
import { reducer } from "./store/store";
import { configureStore } from "@reduxjs/toolkit";
import { useToken } from "./hooks/useToken";

const store = configureStore({ reducer: reducer })
export type RootState = ReturnType<typeof store.getState>

function AppComponent() {

  // const [postsData] = useBestPostsData();
  useToken();

  return (
    // <bestPostsContext.Provider value={postsData}>
    <Layout>
      <Header />
      <Content>
        <CardsList />
      </Content>
    </Layout>
    // </bestPostsContext.Provider>
  )
}

export const App = hot(() => <Provider store={store}><AppComponent /></Provider>);
