import React from "react";

interface IPost {
  author: string;
  authorUrl: string;
  avatarSrc: string;
  createdAt: string;
  postTitle: string;
  postUrl: string
  previewSrc: string;
  upvotes: number;
  comments: number
}

export const postsContext = React.createContext<IPost[]>([]);
