import React, { useState } from "react";
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
import { commentContext } from "./shared/context/commentContext";


function AppComponent() {

  const [commentValue, setCommentValue] = useState('');
  const [token] = useToken();
  const [postsData] = useBestPostsData();

  return (
    <commentContext.Provider value={{
      value: commentValue,
      onChange: setCommentValue,
    }}>
      <tokenContext.Provider value={token}>
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
      </tokenContext.Provider>
    </commentContext.Provider>
  )
}

export const App = hot(() => <AppComponent />);
