import { Action, createAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../app";
import axios from "axios";

export const meRequest = createAction('ME_REQUEST');

export const meRequestSuccess = createAction('ME_REQUEST_SUCCESS',
  function prepare(username: string, iconImg: string) { return { payload: { username, iconImg } } });

export const meRequestError = createAction<string>('ME_REQUEST_ERROR');

export interface IUserData {
  username: string;
  iconImg: string;
}

export interface IMeState {
  data: IUserData;
  loading: boolean;
  error: string;
}

const initialState: IMeState = {
  data: {
    username: '',
    iconImg: ''
  },
  loading: false,
  error: '',
}

export const me = createSlice({
  name: 'me',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(meRequest, (state, action) => {
        state.loading = true
      })
      .addCase(meRequestSuccess, (state, action) => {
        state.data = {
          username: action.payload.username,
          iconImg: action.payload.iconImg
        };
        state.loading = false;
      })
      .addCase(meRequestError, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addDefaultCase((state, action) => { state })
  }
})

export const meRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(meRequest());
  axios.get(
    'https://oauth.reddit.com/api/v1/me',
    { headers: { Authorization: `bearer ${getState().token.token}` } }
  )
    .then((res) => {
      const userData = res.data;
      dispatch(meRequestSuccess(userData.name, userData.icon_img.substring(0, userData.icon_img.indexOf('?'))));
    })
    .catch((error) => {
      dispatch(meRequestError(String(error)));
    })
}
