import { Action, createAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../app";

export const setToken = createAction<string>('SET_TOKEN');

export const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
  if (window.__token__) {
    dispatch(setToken(window.__token__));
  }
}

const initialState: { token: string } = {
  token: ''
}

export const token = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setToken, (state, action) => {
        state.token = action.payload
      })
      .addDefaultCase((state) => { state })
  }
})
