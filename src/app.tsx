import React from "react";
import { hot } from "react-hot-loader/root";
import './main.global.scss';
import { CardsList } from "./shared/CardsList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";
import { Provider } from "react-redux";
import { reducer } from "./store/store";
import { configureStore } from "@reduxjs/toolkit";
import { useToken } from "./hooks/useToken";

const store = configureStore({ reducer: reducer })
export type RootState = ReturnType<typeof store.getState>

function AppComponent() {

  useToken();

  return (
    <Layout>
      <Header />
      <Content>
        <CardsList />
      </Content>
    </Layout>
  )
}

export const App = hot(() => <Provider store={store}><AppComponent /></Provider>);
