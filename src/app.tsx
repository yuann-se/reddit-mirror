import React, { } from "react";
import { hot } from "react-hot-loader/root";
import { Redirect, Route, Switch } from 'react-router-dom';
import './main.global.scss';
import { CardsList } from "./shared/CardsList";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";
import { Provider } from "react-redux";
import { reducer } from "./store/store";
import { configureStore } from "@reduxjs/toolkit";
import { useToken } from "./hooks/useToken";
import { ErrorScreen } from "./shared/CardsList/ErrorScreen";

const store = configureStore({ reducer: reducer })
export type RootState = ReturnType<typeof store.getState>

function AppComponent() {

  useToken();

  return (
    <Layout>
      <Header />
      <Content>

        <Switch>
          <Route exact path='/'>
            <Redirect to="/best/" />
          </Route>
          <Route path='/auth'>
            <Redirect to="/best/" />
          </Route>
          <Route path='/best/'>
            <CardsList />
          </Route>
          <Route exact path='/404'>
            <div style={{ width: '100vw', height: 'calc(100vh - 185px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ErrorScreen message="404 — страница не найдена" />
            </div>
          </Route>
          <Route path='*'>
            <Redirect to='/404' />
          </Route>
        </Switch>

      </Content>
    </Layout>
  )
}

export const App = hot(() => <Provider store={store}><AppComponent /></Provider>);
