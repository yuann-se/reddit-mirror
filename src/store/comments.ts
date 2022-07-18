import { Action, createAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app";

export interface ICommentsData {
  data: {
    children: ICommentsData[]
    id: string;
    body: string;
    author: string;
    created: string;
    replies: ICommentsData;
  }
}

interface IInitState {
  commentsData: {
    [postID: string]: ICommentsData[]
  }
}

const initialState: IInitState = {
  commentsData: {},
}

// function getRequiredData(initData: ICommentsData[]) {
//   const reqData: ICommentsData[] = [];
//   initData.map((item) => {
//     reqData.push({data:{
//       children: [],
//       id: item.data.id,
//       body: item.data.body,
//       author: item.data.author,
//       created: item.data.created,
//       replies: item.data.replies ? getRequiredData(item.data.replies.data.children) : []
//     }});
//   })
//   return reqData;
// }

export const setCommentsData = createAction('SET_COMMENTS_DATA',
  function prepare(id: string, data: ICommentsData[]) {
    return { payload: { id, data } }
  });

export const saveComments = (subreddit: string, postID: string): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
  axios.get(
    `https://api.reddit.com/r/${subreddit}/comments/${postID}?sort=top`,
  )
    .then((res) => {
      const initRes = res.data[1].data.children;

      dispatch(setCommentsData(postID, initRes))
    })
}

export const comments = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCommentsData, (state, action) => {
        state.commentsData[action.payload.id] = action.payload.data;
      })
      .addDefaultCase((state, action) => { state })
  }
})
