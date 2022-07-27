import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IUserData {
  username: string;
  iconImg: string;
}

export interface IMeState {
  data: IUserData;
  loading: boolean;
  fetchError: string;
}

const initialState: IMeState = {
  data: {
    username: '',
    iconImg: ''
  },
  loading: false,
  fetchError: '',
}

export const meRequest = createAsyncThunk('ME_REQUEST',
  async (token: string) => {
    const res = await axios.get(
      'https://oauth.reddit.com/api/v1/me',
      { headers: { Authorization: `bearer ${token}` } }
    );
    const username: string = res.data.name;
    const iconImg: string = res.data.icon_img.split('&amp;').join('&');
    return { username, iconImg }
  })

export const me = createSlice({
  name: 'me',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(meRequest.pending, (state) => {
        state.loading = true
      })
      .addCase(meRequest.fulfilled, (state, action) => {
        state.data = {
          username: action.payload.username,
          iconImg: action.payload.iconImg
        }
        state.loading = false;
        state.fetchError = '';
      })
      .addCase(meRequest.rejected, (state, action) => {
        state.fetchError = action.error.message!;
        state.loading = false;
      })
  }
})
