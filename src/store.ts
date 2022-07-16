import { createAction, createReducer } from "@reduxjs/toolkit";

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

export type TInitialState = {
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
  userData: {
    username: string;
    iconImg: string;
  }
}

const initialState: TInitialState = {
  myPostComment: {},
  commentsData: {},
  commentsReplies: {},
  token: '',
  userData: {
    username: '',
    iconImg: ''
  }
}

export const updateComment = createAction('UPDATE_COMMENT',
  function prepare(id: string, text: string) { return { payload: { id, text } } });

export const updateReply = createAction('UPDATE_REPLY',
  function prepare(id: string, isOpen: boolean, text: string) { return { payload: { id, isOpen, text } } });

export const setToken = createAction<string>('SET_TOKEN');

export const setUserData = createAction('SET_USER_DATA',
  function prepare(username: string, iconImg: string) { return { payload: { username, iconImg } } });

export const setCommentsData = createAction('SET_COMMENTS_DATA',
  function prepare(id: string, data: ICommentsData[]) { return { payload: { id, data } } });

export const rootReducer = createReducer(initialState, (builder) => {
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
    .addCase(setUserData, (state, action) => {
      state.userData = {
        username: action.payload.username,
        iconImg: action.payload.iconImg
      }
    })
    .addDefaultCase((state, action) => { state })
})


