import React, { useEffect, useState } from "react";
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
import { commentContext } from "./shared/context/commentContext";
import axios from "axios";


function AppComponent() {

  const [commentValue, setCommentValue] = useState('');
  const [token] = useToken();
  const [postsData] = usePostsData();

  // useEffect(() => {
  //   axios.get(
  //     `https://reddit.com/${postsData[0].subreddit}/comments/${postsData[0].id}`,
  //     // { headers: { Authorization: `bearer ${token}` } }
  //   )
  //     .then((res) => {
  //       console.log(res)
  //     })
  //   })

  return (
    <commentContext.Provider value={{
      value: commentValue,
      onChange: setCommentValue,
    }}>
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
    </commentContext.Provider>
  )
}

export const App = hot(() => <AppComponent />);
