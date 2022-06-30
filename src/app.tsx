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
import { usePostsData } from "./hooks/usePostsData";
import { postsContext } from "./shared/context/postsContext";


function AppComponent() {

  const [token] = useToken();
  const [postsData] = usePostsData();

  return (
    <tokenContext.Provider value={token}>
      <UserContextProvider>
        <postsContext.Provider value={postsData}>
          <Layout>
            <Header />
            <Content>
              <CardsList />
            </Content>
          </Layout>
        </postsContext.Provider>
      </UserContextProvider>
    </tokenContext.Provider>
  )
}

export const App = hot(() => <AppComponent />);
