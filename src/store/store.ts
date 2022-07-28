import { combineReducers, createAction, createSlice } from "@reduxjs/toolkit";
import { bestPosts } from "./bestPosts";
import { comments } from "./comments";
import { me } from "./me";
import { token } from "./token";

export interface IMainState {
  myPostComment: {
    [postID: string]: { text: string }
  };
  commentsReplies: {
    [commentID: string]: { isOpen: boolean, text: string }
  }
}

const initialState: IMainState = {
  myPostComment: {},
  commentsReplies: {},
}

export const updateComment = createAction('UPDATE_COMMENT',
  function prepare(id: string, text: string) { return { payload: { id, text } } });

export const updateReply = createAction('UPDATE_REPLY',
  function prepare(id: string, isOpen: boolean, text: string) { return { payload: { id, isOpen, text } } });


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
      .addDefaultCase((state) => { state })
  }
})


export const reducer = combineReducers({
  me: me.reducer,
  token: token.reducer,
  comments: comments.reducer,
  bestPosts: bestPosts.reducer,
  main: main.reducer
})

