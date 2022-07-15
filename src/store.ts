import { createAction, createReducer } from "@reduxjs/toolkit";

export type TInitialState = {
  postComments: {
    [postID: string]: { text: string }
  };
  commentsReplies: {
    [commentID: string]: { isOpen: boolean, text: string }
  }
  token: string;
  userData: {
    username: string;
    iconImg: string;
  }
}

const initialState: TInitialState = {
  postComments: {},
  commentsReplies: {},
  token: '',
  userData: {
    username: '',
    iconImg: ''
  }
}

export const updateComment = createAction('UPDATE_COMMENT',
  function prepare(id, text) { return { payload: { id, text } } });

export const updateReply = createAction('UPDATE_REPLY',
  function prepare(id, isOpen, text) { return { payload: { id, isOpen, text } } });

export const setToken = createAction<string>('SET_TOKEN');

export const setUserData = createAction('SET_USER_DATA',
function prepare(username, iconImg) { return { payload: { username, iconImg } } });

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateComment, (state, action) => {
      state.postComments[action.payload.id] = { text: action.payload.text }
    })
    .addCase(updateReply, (state, action) => {
      state.commentsReplies[action.payload.id] = {
        text: action.payload.text,
        isOpen: action.payload.isOpen
      }
    })
    .addCase(setToken, (state, action) => {
      state.token = action.payload
    })
    .addCase(setUserData, (state, action) => {
      state.userData = {
        username: action.payload.username,
        iconImg: action.payload.iconImg
      }
    })
    .addDefaultCase((state, action) => { state })
})


