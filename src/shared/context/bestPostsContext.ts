import React from "react";

interface IPost {
  author: string;
  authorUrl: string;
  avatarSrc: string;
  createdAt: string;
  id: string;
  postTitle: string;
  postUrl: string;
  previewSrc: string;
  upvotes: number;
  upvoteRatio: number;
  comments: number
}

export const bestPostsContext = React.createContext<IPost[]>([]);
