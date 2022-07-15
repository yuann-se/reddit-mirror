import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import './main.global.scss';
import { CardsList } from "./shared/CardsList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";
import { useBestPostsData } from "./hooks/useBestPostsData";
import { bestPostsContext } from "./shared/context/bestPostsContext";
import { Provider, useDispatch } from "react-redux";
import { rootReducer, setToken, setUserData } from "./store";
import { configureStore } from "@reduxjs/toolkit";
import { useToken } from "./hooks/useToken";
import { useUserData } from "./hooks/useUserData";

const store = configureStore({ reducer: rootReducer })

function AppComponent() {

  const [postsData] = useBestPostsData();
  const dispatch = useDispatch();

  const token = useToken();
  useEffect(() => {
    dispatch(setToken(token));
  }, [token])

  const { name, iconImg } = useUserData();
  useEffect(() => {
    dispatch(setUserData(name, iconImg))
  })


  return (
    <bestPostsContext.Provider value={postsData}>
      <Layout>
        <Header />
        <Content>
          <CardsList />
        </Content>
      </Layout>
    </bestPostsContext.Provider>
  )
}

export const App = hot(() => <Provider store={store}><AppComponent /></Provider>);
