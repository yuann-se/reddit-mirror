import React from "react";
import { hot } from "react-hot-loader/root";
import './main.global.css';
import { CardsList } from "./shared/CardsList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";

function AppComponent() {
  return (
    <Layout>
      <Header />
      <Content>
        <CardsList />
      </Content>
    </Layout>
  )
}

export const App = hot(AppComponent);
