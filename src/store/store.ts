import { Action, combineReducers, createAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../app";
import { me } from "./me";

interface ICommentsData {
  data: {
    children: ICommentsData[]
    id: string;
    body: string;
    author: string;
    created: string;
    replies: ICommentsData;
  }
}

export interface IMainState {
  myPostComment: {
    [postID: string]: { text: string }
  };
  commentsData: {
    [postID: string]: ICommentsData[];
  }
  commentsReplies: {
    [commentID: string]: { isOpen: boolean, text: string }
  }
  token: string;
}

const initialState: IMainState = {
  myPostComment: {},
  commentsData: {},
  commentsReplies: {},
  token: '',
}

export const updateComment = createAction('UPDATE_COMMENT',
  function prepare(id: string, text: string) { return { payload: { id, text } } });

export const updateReply = createAction('UPDATE_REPLY',
  function prepare(id: string, isOpen: boolean, text: string) { return { payload: { id, isOpen, text } } });

export const setToken = createAction<string>('SET_TOKEN');
export const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  if (window.__token__) {
    dispatch(setToken(window.__token__));
  }
}

export const setCommentsData = createAction('SET_COMMENTS_DATA',
  function prepare(id: string, data: ICommentsData[]) { return { payload: { id, data } } });



export const main = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateComment, (state, action) => {
        state.myPostComment[action.payload.id] = { text: action.payload.text }
      })
      .addCase(updateReply, (state, action) => {
        state.commentsReplies[action.payload.id] = {
          text: action.payload.text,
          isOpen: action.payload.isOpen
        }
      })
      .addCase(setCommentsData, (state, action) => {
        state.commentsData[action.payload.id] = action.payload.data;
      })
      .addCase(setToken, (state, action) => {
        state.token = action.payload
      })
      .addDefaultCase((state, action) => { state })
  }
})


export const reducer = combineReducers({
  me: me.reducer,
  main: main.reducer
})

