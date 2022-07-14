import { createAction, createReducer } from "@reduxjs/toolkit";
import { ActionCreator, AnyAction, Reducer } from "redux";

export type TInitialState = {
  postComments: {
    [postID: string]: { text: string }
  }
  token: string;
}

const initialState: TInitialState = {
  postComments: {},
  token: ''
}

export const UPDATE_COMMENT = createAction('UPDATE_COMMENT', function prepare(id, text) { return {payload: {id, text}}});
export const SET_TOKEN = createAction<string>('SET_TOKEN');

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UPDATE_COMMENT, (state, action) => {
      state.postComments[action.payload.id] = {text: action.payload.text}
    })
    .addCase(SET_TOKEN, (state, action) => {
      state.token = action.payload
    })
    .addDefaultCase((state, action) => {state})
})


