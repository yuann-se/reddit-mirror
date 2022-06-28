import React from "react";
import { hot } from "react-hot-loader/root";
import { useToken } from "./hooks/useToken";
import './main.global.scss';
import { CardsList } from "./shared/CardsList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";

function AppComponent() {
  const [token] = useToken();
  return (
    <Layout>
      <Header token={token}/>
      <Content>
        <CardsList />
      </Content>
    </Layout>
  )
}

export const App = hot(() => <AppComponent />);
