import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IInitPost {
  data: {
    author: string;
    avatarSrc: string;
    created: string;
    id: string;
    title: string;
    preview?: {
      images: [
        {
          source: {
            url: string;
          }
          resolutions: [
            {
              url: string;
            }
          ]
        }
      ]
    }
    url: string
    ups: number;
    upvote_ratio: number;
    num_comments: number;
    sr_detail: {
      icon_img: string
    }
  }
}

interface IPost {
  author: string;
  authorUrl: string;
  avatarSrc: string;
  createdAt: string;
  id: string;
  postTitle: string;
  postUrl: string
  previewSrc: string;
  lqPreviewSrc: string;
  upvotes: number;
  upvoteRatio: number;
  comments: number
}

export const saveBestPosts = createAsyncThunk('SAVE_BEST_POSTS',
  async () => {
    let postsData: IPost[] = [];

    const res = await axios.get(
      'https://oauth.reddit.com/best.json?sr_detail=true',
      { headers: { Authorization: `bearer ` } }
    );

    const initData = res.data.data.children;
    // console.log(initData)
    initData.map(({ data }: IInitPost) => {
      const prevSrc = data.preview
        ? data.preview.images[0].source.url.split('&amp;').join('&')
        : 'default'

      const lqPrevSrc = data.preview
        ? data.preview.images[0].resolutions[0].url.split('&amp;').join('&')
        : 'default'

      const post: IPost = {
        author: data.author,
        authorUrl: `https://www.reddit.com/user/${data.author}/`,
        avatarSrc: data.sr_detail.icon_img,
        createdAt: data.created,
        id: data.id,
        postTitle: data.title,
        postUrl: data.url,
        previewSrc: prevSrc,
        lqPreviewSrc: lqPrevSrc,
        upvotes: data.ups,
        upvoteRatio: data.upvote_ratio,
        comments: data.num_comments
      };

      postsData.push(post);
    })
    return postsData;
  })

interface IInitState {
  data: IPost[];
  loading: boolean;
  fetchError: string;
}

const initialState: IInitState = {
  data: [],
  loading: false,
  fetchError: ''
}

export const bestPosts = createSlice({
  name: 'bestPosts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveBestPosts.pending, (state) => {
        state.loading = true;
        state.fetchError = '';
      })
      .addCase(saveBestPosts.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.error.message!;
      })
      .addCase(saveBestPosts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.fetchError = '';
      })
  }
})
