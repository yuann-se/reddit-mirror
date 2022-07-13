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
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./store";
import { legacy_createStore as createStore } from 'redux';

const store = createStore(rootReducer, composeWithDevTools())

function AppComponent() {

  const [token] = useToken();
  const [postsData] = useBestPostsData();

  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export const App = hot(() => <AppComponent />);
